'use strict';
// Slideshow Function
document.addEventListener("DOMContentLoaded", function() {
    let galleryImages = document.querySelectorAll(".gallery-image img");
    let fullscreenOverlay = document.querySelector(".fullscreen-overlay");
    let fullscreenImage = document.querySelector(".fullscreen-image");
    let fullscreenImageContainer = document.querySelector(".fullscreen-image-container"); // Assuming this is the container
    let closeFullscreenBtn = document.querySelector(".close-fullscreen-btn");

    // Add event listener to close button
    closeFullscreenBtn.addEventListener("click", function() {
        fullscreenOverlay.style.display = "none";
    });

    // Initialize image index
    let currentIndex = 0;

    // Function to display image by index
    function showImage(index) {
        let src = galleryImages[index].src;
        fullscreenImage.src = src;
    }

    // Function to show next image
    function showNextImage() {
        currentIndex++;
        if (currentIndex >= galleryImages.length) {
            currentIndex = 0; // Loop back to the first image
        }
        showImage(currentIndex);
    }

    // Function to show previous image
    function showPreviousImage() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = galleryImages.length - 1; // Go to the last image
        }
        showImage(currentIndex);
    }

    // Add event listener to each image
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", function() {
            currentIndex = index; // Set the current index
            showImage(currentIndex);
            fullscreenOverlay.style.display = "flex";
        });
    });

    // Add event listeners for navigation buttons
    document.querySelector(".prev-btn").addEventListener("click", function() {
        showPreviousImage();
    });

    document.querySelector(".next-btn").addEventListener("click", function() {
        showNextImage();
    });

    // Event listener for keyboard navigation and closing
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") {
            showPreviousImage();
        } else if (e.key === "ArrowRight") {
            showNextImage();
        } else if (e.key === "Escape") {
            fullscreenOverlay.style.display = "none";
        }
    });

    // Close overlay when clicking outside the fullscreen image container
    fullscreenOverlay.addEventListener("click", function(e) {
        if (!fullscreenImageContainer.contains(e.target)) { // Checks if the click was outside the image container
            fullscreenOverlay.style.display = "none";
        }
    });

    // Prevent clicks inside the fullscreen image container from closing the overlay
    fullscreenImageContainer.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevents the event from bubbling up to the fullscreenOverlay
    });
});


// Modal Function

document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listeners to 'More Info' links
    document.querySelectorAll('.more-info').forEach(function(infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor link behavior
            var modal = this.nextElementSibling; // Assuming modal is the next sibling
            modal.style.display = "block"; // Show the modal
        });
    });

    // Attach click event listener to close buttons within modals
    document.querySelectorAll('.modal .close').forEach(function(closeBtn) {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = "none"; // Close the modal
        });
    });

    // Close the modal if the user clicks anywhere outside of the modal content
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = "none";
        }
    });
});

// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// light/dark mode
document.addEventListener('DOMContentLoaded', () => {
    const checkBox = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        checkBox.checked = true;
    }

    checkBox.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (this.checked) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
    });
});