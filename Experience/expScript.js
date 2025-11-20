// This is the animation script you already had
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// --- NEW AUDIO SCRIPT ---
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");
    const volumeSlider = document.getElementById("volume");
    const volumeIcon = document.getElementById("volume-icon");

    // --- Helper function to update the icon ---
    function updateVolumeIcon() {
        if (audio.muted || audio.volume === 0) {
            volumeIcon.textContent = "🔇";
            volumeIcon.classList.add("muted");
            volumeIcon.classList.remove("playing");
        } else {
            volumeIcon.textContent = "🔊";
            volumeIcon.classList.add("playing");
            volumeIcon.classList.remove("muted");
        }
    }

    // --- Load saved settings on page load ---
    const savedTime = localStorage.getItem("music-time");
    const savedVolume = localStorage.getItem("music-volume");
    const savedMuted = localStorage.getItem("music-muted") === 'true'; // Convert string to boolean

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Set volume and slider position
    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
    volumeSlider.value = audio.volume;

    // Set the muted state
    audio.muted = savedMuted;

    // Update the icon to reflect the loaded state
    updateVolumeIcon();

    // Attempt to play audio
    audio.play().catch(() => {
        // If browser blocks autoplay, wait for the first user interaction
        document.body.addEventListener("click", () => audio.play(), { once: true });
    });

    // --- Save playtime periodically ---
    setInterval(() => {
        localStorage.setItem("music-time", audio.currentTime);
    }, 500);

    // --- Event Listener for the Volume Icon (Mute Toggle) ---
    volumeIcon.addEventListener("click", () => {
        // Toggle the muted state
        audio.muted = !audio.muted;
        // Save the new state
        localStorage.setItem("music-muted", audio.muted);
        // Update the icon
        updateVolumeIcon();
    });

    // --- Event Listener for the Volume Slider ---
    volumeSlider.addEventListener("input", () => {
        // Update audio volume
        audio.volume = volumeSlider.value;

        // If user is adjusting volume, they probably want to hear it
        if (audio.volume > 0 && audio.muted) {
            audio.muted = false;
            localStorage.setItem("music-muted", "false");
        }
        
        // Save the new volume
        localStorage.setItem("music-volume", volumeSlider.value);
        
        // Update the icon
        updateVolumeIcon();
    });
    
});
// --- NEW FONT RESIZING SCRIPT ---
function changeFontSize(sectionId, direction) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Find all elements within the section that contain text you want to resize
    const elementsToResize = section.querySelectorAll('.experience-title, .experience-subtitle, .experience-date, .experience-description');

    // Define min/max font sizes (in pixels)
    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 28;
    const FONT_STEP = 1; // How many pixels to change on each click

    elementsToResize.forEach(el => {
        // Get the current font size and convert it to a number (in pixels)
        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);

        // Calculate the new size
        let newSize;
        if (direction === 'up') {
            newSize = currentSize + FONT_STEP;
        } else {
            newSize = currentSize - FONT_STEP;
        }

        // Apply the new size only if it's within the defined limits
        if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
            el.style.fontSize = newSize + 'px';
        }
    });
}
