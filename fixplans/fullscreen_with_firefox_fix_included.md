Here's the updated markdown document that covers both scenarios:

---

# Fix: Client Window Slide Sync Issues (F11 Fullscreen & Firefox)

## Problem Description

The client window fails to receive slide updates in two scenarios:

### Scenario 1: F11 Fullscreen Mode (All Browsers)
When the client window is in F11 fullscreen mode and the agent Alt+Tabs back to Script Assist, slide updates don't reach the client window.

### Scenario 2: Firefox - Any Window State
In Firefox, simply sending the client window to the background (clicking away, Alt+Tab, etc.) breaks slide sync - even when the window is in normal (non-fullscreen) view.

## Root Cause

Both issues stem from browser throttling of `postMessage` events for unfocused/background windows:

| Browser | Normal Window (Unfocused) | F11 Fullscreen (Unfocused) |
|---------|---------------------------|----------------------------|
| Chrome/Edge | Works | **Throttled - Broken** |
| Firefox | **Throttled - Broken** | **Throttled - Broken** |
| Safari | Works | **Throttled - Broken** |

**Why Firefox is different:** Firefox applies aggressive power-saving throttling to ALL background windows, not just fullscreen ones. This is a deliberate browser optimization to reduce CPU/battery usage.

The current implementation relies on `postMessage` to sync slide changes:
```typescript
// In useClientWindow.ts - updateSlide function
clientWindow.postMessage({ type: 'UPDATE_SLIDE', payload: { slide } }, '*');
```

When the client window loses focus, the browser deprioritizes or delays processing of these messages.

## Solution

Implement a `localStorage`-based sync mechanism with continuous polling. This bypasses `postMessage` throttling because:

1. **localStorage reads are never throttled** - Even in background windows, JavaScript can read from localStorage at full speed
2. **Polling bypasses event throttling** - We're actively reading data, not waiting for events
3. **Cross-tab communication** - localStorage is shared between same-origin windows

### Implementation Steps

#### Step 1: Modify `src/hooks/useClientWindow.ts`

In the `updateSlide` function, add localStorage write alongside the existing postMessage:

```typescript
const updateSlide = (slide: Slide | null) => {
  if (!clientWindow || clientWindow.closed) {
    console.warn('Client window is not available');
    return;
  }

  // Write to localStorage for Firefox/F11 fullscreen fallback
  try {
    localStorage.setItem('presentation_slide_sync', JSON.stringify({
      slideId: slide?.id || null,
      slide,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Failed to sync slide to storage:', e);
  }

  // Keep existing postMessage for immediate updates when window is focused
  const message = { type: 'UPDATE_SLIDE', payload: { slide } };
  clientWindow.postMessage(message, '*');
};
```

In the `closeClientWindow` function, add cleanup:

```typescript
const closeClientWindow = () => {
  if (clientWindowRef.current && !clientWindowRef.current.closed) {
    clientWindowRef.current.close();
  }
  clientWindowRef.current = null;
  setIsWindowReady(false);
  setCurrentMode('presentation');

  // Clean up slide sync storage
  try {
    localStorage.removeItem('presentation_slide_sync');
  } catch (e) {
    console.error('Failed to clean up slide sync storage:', e);
  }
};
```

#### Step 2: Modify `src/pages/ClientWindow.tsx`

Add a useEffect to poll localStorage when in presentation mode:

```typescript
// Add this useEffect for localStorage-based slide sync (Firefox/F11 fix)
useEffect(() => {
  if (mode !== 'presentation') return;

  let lastTimestamp = 0;

  const pollSlideStorage = () => {
    try {
      const stored = localStorage.getItem('presentation_slide_sync');
      if (stored) {
        const { slide, timestamp } = JSON.parse(stored);
        if (timestamp > lastTimestamp) {
          lastTimestamp = timestamp;
          setCurrentSlide(slide);
        }
      }
    } catch (e) {
      // Ignore parse errors silently
    }
  };

  // Poll every 200ms - fast enough for smooth transitions, light on resources
  const interval = setInterval(pollSlideStorage, 200);

  // Also poll immediately on mount
  pollSlideStorage();

  return () => clearInterval(interval);
}, [mode]);
```

## Why This Works

| Mechanism | Focused Window | Unfocused Window | F11 Unfocused |
|-----------|----------------|------------------|---------------|
| postMessage | ✅ Instant | ⚠️ May be throttled | ❌ Heavily throttled |
| localStorage polling | ✅ Works | ✅ Works | ✅ Works |

The localStorage approach works universally because:
- Reading localStorage is a synchronous operation that browsers don't throttle
- The polling interval (200ms) ensures updates appear within 200ms worst-case
- Timestamp comparison prevents unnecessary re-renders

## Testing Checklist

After implementation, verify these scenarios work:

### Chrome/Edge
- [ ] Normal window, focused - slides advance
- [ ] Normal window, unfocused (Alt+Tab away) - slides advance
- [ ] F11 fullscreen, unfocused - slides advance

### Firefox
- [ ] Normal window, focused - slides advance
- [ ] Normal window, unfocused (Alt+Tab away) - slides advance
- [ ] F11 fullscreen, unfocused - slides advance

### Safari (if available)
- [ ] Normal window, focused - slides advance
- [ ] Normal window, unfocused - slides advance
- [ ] Fullscreen, unfocused - slides advance

## Files Modified

| File | Changes |
|------|---------|
| `src/hooks/useClientWindow.ts` | Add localStorage write in `updateSlide()`, cleanup in `closeClientWindow()` |
| `src/pages/ClientWindow.tsx` | Add polling useEffect for slide sync |

## Performance Notes

- **200ms polling interval** is a good balance between responsiveness and CPU usage
- localStorage operations are very fast (< 1ms typically)
- The timestamp comparison ensures we only update state when data actually changes
- Memory usage is minimal (single JSON object ~1KB)

## Future Considerations

If even lower latency is needed, consider adding `BroadcastChannel` API as an intermediate layer between postMessage and localStorage polling. However, the localStorage approach should be sufficient for presentation use cases where 200ms latency is imperceptible.

---

You can replace the content in your GitHub file at `https://github.com/hyberion/scriptAssist/blob/main/fixplans/fullscreenFix.md` with this updated version. It now covers both the F11 issue AND the Firefox-specific behavior, making it clear this is a comprehensive fix for all slide sync throttling scenarios.
