Absolutely! Here's a comprehensive markdown document you can save to your GitHub repo for future reference:

---

```markdown
# F11 Fullscreen Slide Sync Fix

## Issue Description

**Problem:** When the client window is in F11 fullscreen mode and the agent Alt+Tabs back to Script Assist, slide updates don't reach the client window automatically. However, when the client window is at default size (not F11), clicking back to Script Assist works fine.

**Root Cause:** Browsers aggressively throttle `postMessage` event processing for background windows that are in fullscreen mode. This is a browser optimization to save resources, but it breaks our slide synchronization.

**Affected Files:**
- `src/hooks/useClientWindow.ts` - Agent side, sends slide updates
- `src/pages/ClientWindow.tsx` - Client side, receives slide updates

---

## Solution Overview

Add a `localStorage`-based sync mechanism alongside the existing `postMessage` approach. The client window will poll localStorage for changes, which is not throttled even in background fullscreen mode.

---

## Implementation Steps

### Step 1: Modify `src/hooks/useClientWindow.ts`

#### 1a. Add localStorage write in `updateSlide()` function

Find the `updateSlide` function and add localStorage write **before** the postMessage call:

```typescript
const updateSlide = (slide: Slide | null) => {
  if (!clientWindowRef.current || clientWindowRef.current.closed) {
    return;
  }

  // ADD THIS: Write to localStorage for F11 fullscreen fallback
  try {
    localStorage.setItem('presentation_slide_sync', JSON.stringify({
      slideId: slide?.id || null,
      slide,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.error('Failed to sync slide to storage:', e);
  }

  // Existing postMessage logic continues...
  const message = {
    type: 'UPDATE_SLIDE',
    payload: { slide }
  };

  clientWindowRef.current.postMessage(message, '*');
};
```

#### 1b. Add cleanup in `closeClientWindow()` function

Add localStorage cleanup when the client window is closed:

```typescript
const closeClientWindow = () => {
  if (clientWindowRef.current && !clientWindowRef.current.closed) {
    clientWindowRef.current.close();
  }
  clientWindowRef.current = null;
  setIsWindowReady(false);
  setCurrentMode('presentation');

  // ADD THIS: Clean up slide sync storage
  try {
    localStorage.removeItem('presentation_slide_sync');
  } catch (e) {
    console.error('Failed to clean up slide sync data:', e);
  }
};
```

---

### Step 2: Modify `src/pages/ClientWindow.tsx`

Add a polling useEffect that watches localStorage for slide changes when in presentation mode.

Add this useEffect somewhere in the component (after the existing useEffects):

```typescript
// Polling fallback for F11 fullscreen mode
// Browsers throttle postMessage for background fullscreen windows,
// but localStorage reads are not throttled
useEffect(() => {
  if (mode !== 'presentation') return;

  let lastTimestamp = 0;

  const pollSlideStorage = () => {
    try {
      const stored = localStorage.getItem('presentation_slide_sync');
      if (stored) {
        const { slide, timestamp } = JSON.parse(stored);
        // Only update if we have a new timestamp
        if (timestamp > lastTimestamp) {
          lastTimestamp = timestamp;
          if (slide) {
            setCurrentSlide(slide);
          }
        }
      }
    } catch (e) {
      // Ignore parse errors - localStorage might have stale/invalid data
    }
  };

  // Poll every 200ms - fast enough for smooth transitions, light enough for performance
  const interval = setInterval(pollSlideStorage, 200);

  // Initial poll immediately
  pollSlideStorage();

  return () => clearInterval(interval);
}, [mode]);
```

---

## Why This Works

| Approach | Works in F11 Background? | Why |
|----------|-------------------------|-----|
| `postMessage` events | ❌ No | Browsers throttle event processing for background fullscreen windows |
| `localStorage` reads | ✅ Yes | Reading from storage is synchronous and not subject to event throttling |
| Polling (setInterval) | ✅ Yes | Timers still fire in background windows, just at reduced frequency |

**Key insight:** Even though `setInterval` is throttled in background windows (typically to 1 second), reading from localStorage is still immediate. The 200ms interval in normal operation becomes ~1000ms in background, which is still acceptable for slide transitions.

---

## Testing Checklist

- [ ] Open client window and go F11 fullscreen
- [ ] Alt+Tab back to Script Assist
- [ ] Navigate through presentation slides
- [ ] Verify client window updates slides even while in background fullscreen
- [ ] Alt+Tab back to client window and verify correct slide is displayed
- [ ] Close client window and verify no console errors
- [ ] Verify normal (non-F11) operation still works as expected

---

## Future Enhancements

If 200ms-1000ms latency is too slow, consider:

1. **BroadcastChannel API** - More reliable than postMessage for same-origin windows
2. **SharedWorker** - Can maintain state across windows without polling
3. **Service Worker** - Could relay messages even to background windows

For now, the localStorage polling approach is the simplest and most reliable fix.

---

## Related Files

- `src/hooks/useFormFieldSync.ts` - Uses similar localStorage pattern for form fields
- `src/components/Forms/AgentFormFieldList.tsx` - Example of localStorage sync in action
- `src/hooks/usePresentationWindow.ts` - Older presentation window hook (reference only)
```

---

Save this as something like `docs/f11-fullscreen-slide-sync-fix.md` and you'll have everything you need when you're ready to implement it!

Connect YouTrack API
Fix Next Issue
