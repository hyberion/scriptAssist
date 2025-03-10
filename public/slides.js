document.addEventListener("DOMContentLoaded", async () => {
    let slides = [];
    let currentIndex = 0;

    // Fetch slides from the server
    async function fetchSlides() {
        try {
            const response = await fetch("/api/get-slides");
            slides = await response.json();
            if (slides.length > 0) {
                loadSlide(0); // Load the first slide
            }
        } catch (error) {
            console.error("Error fetching slides:", error);
        }
    }

    // Load a slide by index
    function loadSlide(index) {
        if (index < 0 || index >= slides.length) return;

        currentIndex = index;
        const slide = slides[index];

        // Inject slide content into the container
        document.getElementById("slide-container").innerHTML = `
            <section class="slide" data-slide-id="${slide.id}">
                <div class="slide-header">
                    <h2 class="slide-title">${slide.slideTitle}</h2>
                </div>
                <div class="slide-content">
                    <div class="slide-text">${slide.slideContent}</div>
                    ${slide.slideURL ? `<div class="slide-media"><img src="${slide.slideURL}" alt="Slide Image"></div>` : ""}
                </div>
            </section>
        `;
    }

    // Navigation functions
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            loadSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            loadSlide(currentIndex - 1);
        }
    }

    // Event Listeners
    document.getElementById("next-slide").addEventListener("click", nextSlide);
    document.getElementById("prev-slide").addEventListener("click", prevSlide);

    // Keyboard Navigation
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") nextSlide();
        if (event.key === "ArrowLeft") prevSlide();
    });

    // Load slides on page load
    fetchSlides();
});
// JavaScript Document

