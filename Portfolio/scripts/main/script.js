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

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Jay (Schryzon)", "a Backend Dev", "an AI Enthusiast", "a DevOps Student"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 75;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 3. Scroll Reveal & Skill Progress
    const revealElements = document.querySelectorAll('.reveal');
    const skillCards = document.querySelectorAll('.skill-card');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a skill card, animate the progress bar
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.progress-bar');
                    const targetLevel = entry.target.dataset.level;
                    if (bar) bar.style.width = targetLevel + '%';
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => scrollObserver.observe(el));
    skillCards.forEach(el => scrollObserver.observe(el));

    // 4. Active Nav Tracking
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('#main-nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id') || 'home';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Scroll-to-Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Form Submission Enhancement
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('input[type="submit"]');
            const originalVal = submitBtn.value;
            
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`🚀 Success! Message sent from ${document.getElementById('fullname').value}.`);
                submitBtn.value = originalVal;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }

    // 7. Dark Mode Logic (Enhanced)
    function initDarkMode() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "theme-toggle-btn glass";
        toggleBtn.style.right = "30px";
        document.body.appendChild(toggleBtn);

        function applyTheme(isDark) {
            document.documentElement.classList.toggle("dark-mode", isDark);
            toggleBtn.innerHTML = isDark ? "☀️" : "🌙";
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }

        const initialDark = savedTheme === "dark" || (!savedTheme && prefersDark.matches);
        applyTheme(initialDark);

        toggleBtn.addEventListener("click", () => {
            const isDark = !document.documentElement.classList.contains("dark-mode");
            applyTheme(isDark);
        });
    }

    initDarkMode();
    console.log("Jay's Interactive Portfolio is fully operational!");
});
