window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('background-audio');
    const volumeControl = document.getElementById('volume-control');
    const volumeIcon = document.getElementById('volume-icon');

    // Modern browsers often block autoplay until the user interacts with the page.
    // This attempts to play the audio, and if it fails, waits for a user click.
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // We'll wait for the user to click anywhere to start the audio.
            document.body.addEventListener('click', function() {
                audio.play();
            }, { once: true });
        });
    }

    volumeControl.addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            volumeIcon.src = 'volume-on.png';
            volumeIcon.alt = 'Volume On';
        } else {
            audio.muted = true;
            volumeIcon.src = 'volume-off.png';
            volumeIcon.alt = 'Volume Off';
        }
    });
});