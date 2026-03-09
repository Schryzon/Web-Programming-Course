// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 2. Simple form submission handler
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual submission for demo
            const nameInput = document.getElementById('fullname').value;
            alert(`Thanks, ${nameInput}! Your form was submitted successfully (simulated by JS).`);
            this.reset(); // Clear the form
        });
    }

    // 3. Simple log to confirm it's working
    console.log("Welcome to Jay's Profile! The JavaScript is loaded and working.");
});
