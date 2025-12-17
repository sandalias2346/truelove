// script.js - Refactored and Improved Version

// === Configuration and State ===
const config = {
    traceCount: window.isDevice ? 20 : 50, // Define isDevice if needed, or use feature detection
    traceK: 0.4,
    timeDelta: 0.01
};
let animationId = null; // To control the animation loop
let isHeartActive = false;

// === DOM Elements ===
const btnSi = document.getElementById('btnSi');
const btnNo = document.getElementById('btnNo');
const dialogText = document.querySelector('#cuadroDialogo p');
const canvas = document.getElementById('heart');
const ctx = canvas.getContext('2d');

// === Core Functions ===
function initHeartAnimation() {
    if (isHeartActive) return;
    isHeartActive = true;

    const mobile = window.innerWidth < 768; // Simple mobile detection
    const koef = mobile ? 0.5 : 1;
    let width = canvas.width = koef * window.innerWidth;
    let height = canvas.height = koef * window.innerHeight;
}

function stopHeartAnimation() {
    if (animationId) {
        window.cancelAnimationFrame(animationId);
        animationId = null;
    }
    isHeartActive = false;
    // Clear canvas
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// === Event Listeners (Clean and Efficient) ===
// 'Yes' Button
btnSi.addEventListener('click', function () {
    Swal.fire({
        position: 'top-center',
        title: 'Soy el hombre más feliz del mundo!',
        showConfirmButton: false,
        timer: 1500
    });

    dialogText.textContent = 'osi joder';
    btnNo.style.display = 'none';
    btnSi.disabled = true;

    // Initialize the heart animation
    initHeartAnimation();
});

// 'No' Button - Escape Behavior
btnNo.style.transition = 'transform 0.1s ease-out, opacity 0.2s';
btnNo.addEventListener('mouseover', function () {
    const maxX = window.innerWidth - this.offsetWidth;
    const maxY = window.innerHeight - this.offsetHeight;

    // Keep button within viewport bounds
    const nuevaX = Math.random() * (maxX * 0.8) - (maxX * 0.4);
    const nuevaY = Math.random() * (maxY * 0.8) - (maxY * 0.4);

    this.style.transform = `translate(${nuevaX}px, ${nuevaY}px)`;
});

btnNo.addEventListener('click', function () {
    Swal.fire({
        imageUrl: 'https://trneodavo.000webhostapp.com/meme/meme%20salvador.png',
        imageHeight: 350,
        imageAlt: 'Funny meme image',
        confirmButtonText: '¡Okay!'
    });
});

// === Handle Window Resize (Performance Optimized) ===
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        if (isHeartActive) {
            // Re-initialize animation with new dimensions
            stopHeartAnimation();
            initHeartAnimation();
        }
    }, 250); // Debounce resize events
});

// Clean up on page unload (good practice)
window.addEventListener('beforeunload', stopHeartAnimation);