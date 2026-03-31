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

    // 3. Overkill Dark Mode Logic
    function initDarkMode() {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        const savedTheme = localStorage.getItem("theme");

        // Create toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.className = "theme-toggle-btn";
        toggleBtn.title = "Toggle Dark Mode";
        document.body.appendChild(toggleBtn);

        function applyTheme(isDark) {
            if (isDark) {
                document.documentElement.classList.add("dark-mode");
                toggleBtn.innerHTML = "☀️";
            } else {
                document.documentElement.classList.remove("dark-mode");
                toggleBtn.innerHTML = "🌙";
            }
        }

        // Determine initial theme
        const isDark = savedTheme === "dark" || (!savedTheme && prefersDark.matches);
        applyTheme(isDark);

        // Toggle on click
        toggleBtn.addEventListener("click", () => {
            const currentlyDark = document.documentElement.classList.contains("dark-mode");
            applyTheme(!currentlyDark);
            localStorage.setItem("theme", !currentlyDark ? "dark" : "light");
        });
    }

    initDarkMode();

    // 4. Simple log to confirm it's working
    console.log("Welcome to Jay's Profile! The JavaScript is loaded and working.");
});
