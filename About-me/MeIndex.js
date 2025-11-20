// --- SCRIPT LOGIC ---
// This event listener waits for the HTML to be ready before running any code.
document.addEventListener("DOMContentLoaded", () => {

    // --- ZOOM AND NAVIGATE LOGIC ---

    const deerImage = document.getElementById('deer-box-image');

    function handleDeerClick() {
        // mark that we are leaving
        document.body.classList.add('navigating-away');

        // zoom the actual deer
        deerImage.classList.add('zooming');

        // wait for animation to finish
        setTimeout(() => {
            window.location.href = 'Deer.html';
        }, 700);
    }


    // This attaches the function to the deer image's click event.
    if (deerImage) {
        deerImage.addEventListener('click', handleDeerClick);
    }

    // --- AUDIO SCRIPT ---
    const audio = document.getElementById("bg-music");
    const volumeSlider = document.getElementById("volume");
    const volumeIcon = document.getElementById("volume-icon");

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

    // Load saved settings
    const savedTime = localStorage.getItem("music-time");
    const savedVolume = localStorage.getItem("music-volume");
    const savedMuted = localStorage.getItem("music-muted") === 'true';

    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    audio.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
    volumeSlider.value = audio.volume;
    audio.muted = savedMuted;
    updateVolumeIcon();

    // Attempt to play audio
    audio.play().catch(() => {
        document.body.addEventListener("click", () => audio.play(), { once: true });
    });

    // Save playtime periodically
    setInterval(() => {
        localStorage.setItem("music-time", audio.currentTime);
    }, 500);

    // Mute toggle
    volumeIcon.addEventListener("click", () => {
        audio.muted = !audio.muted;
        localStorage.setItem("music-muted", audio.muted);
        updateVolumeIcon();
    });

    // Volume slider control
    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
        if (audio.volume > 0 && audio.muted) {
            audio.muted = false;
            localStorage.setItem("music-muted", "false");
        }
        localStorage.setItem("music-volume", volumeSlider.value);
        updateVolumeIcon();
    });
});