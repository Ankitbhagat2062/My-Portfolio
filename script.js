const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const closeModal = document.querySelector('.close-modal');
const movieCards = document.querySelectorAll('.movie-card');

// Show video modal and play selected video
movieCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video');
        videoPlayer.src = videoSrc;
        videoModal.classList.add('active');
        videoPlayer.play();
    });
});

// Close video modal
closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.src = '';
});

// Close video modal when clicking outside of the video player
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.src = '';
    }
});
