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
        const words = ["Jay (Schryzon)", "a Backend Dev Portfolio", "an AI Enthusiast Portfolio", "a DevOps Student Portfolio"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 75;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 75;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1700; // Pause at end
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

    // 6. Form Submission Enhancement & Persistence
    const contactForm = document.getElementById('main-contact-form');
    const FORM_STORAGE_KEY = 'contact_form_data';

    if (contactForm) {
        // Load data from localStorage
        const savedData = localStorage.getItem(FORM_STORAGE_KEY);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = contactForm.elements[key];
                if (input && input.type !== 'password') {
                    if (input.type === 'checkbox') {
                        input.checked = data[key];
                    } else {
                        input.value = data[key];
                    }
                }
            });
        }

        // Save data to localStorage on input
        contactForm.addEventListener('input', (e) => {
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                // Don't save password
                if (key !== 'password') {
                    data[key] = value;
                }
            });
            // Handle checkboxes separately
            contactForm.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                data[cb.name] = cb.checked;
            });
            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));

            // Real-time validation for specific field
            if (e.target.name in VALIDATION_RULES) {
                validateField(e.target);
            }
        });

        const VALIDATION_RULES = {
            fullname: {
                pattern: /^[a-zA-Z\s]{3,50}$/,
                error: "Name should be 3-50 letters and spaces only."
            },
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                error: "Please enter a valid email address."
            },
            phone: {
                pattern: /^\d{10}$/,
                error: "Phone number must be exactly 10 digits."
            },
            password: {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                error: "Min 8 chars, 1 uppercase, 1 lowercase, 1 number."
            }
        };

        function validateField(input) {
            const rule = VALIDATION_RULES[input.name];
            const errorSpan = document.getElementById(`${input.name}-error`);

            if (!input.value && input.required) {
                showError(input, errorSpan, "This field is required.");
                return false;
            }

            if (rule && !rule.pattern.test(input.value)) {
                showError(input, errorSpan, rule.error);
                return false;
            }

            hideError(input, errorSpan);
            return true;
        }

        function showError(input, span, message) {
            if (span) {
                span.textContent = message;
                span.classList.add('visible');
            }
            input.style.borderColor = "#ff7675";
        }

        function hideError(input, span) {
            if (span) {
                span.classList.remove('visible');
            }
            input.style.borderColor = "";
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            const fieldsToValidate = ['fullname', 'email', 'phone', 'password', 'message'];

            fieldsToValidate.forEach(fieldName => {
                const input = contactForm.elements[fieldName];
                if (input && !validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) return;

            const submitBtn = this.querySelector('input[type="submit"]');
            const originalVal = submitBtn.value;

            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert(`Success! Message sent from ${document.getElementById('fullname').value}.`);
                submitBtn.value = originalVal;
                submitBtn.disabled = false;

                // Clear localStorage and form
                localStorage.removeItem(FORM_STORAGE_KEY);
                this.reset();
                // Clear any error states
                document.querySelectorAll('.error-msg').forEach(s => s.classList.remove('visible'));
                document.querySelectorAll('input, textarea').forEach(i => i.style.borderColor = "");
            }, 1000);
        });

        // Clear localStorage on reset button
        contactForm.addEventListener('reset', () => {
            localStorage.removeItem(FORM_STORAGE_KEY);
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

    // 8. Last Visit Tracker
    function trackVisit() {
        const lastVisit = localStorage.getItem('last_visit');
        const now = new Date().toLocaleString();
        let subtitle = document.getElementById('subtitle');

        if (lastVisit) {
            subtitle.innerHTML += `<br> Welcome back! Your last visit was on: ${lastVisit}`;
        } else {
            subtitle.innerHTML += "<br> Welcome! This is your first time visiting Jay's Portfolio.";
        }

        localStorage.setItem('last_visit', now);
    }

    trackVisit();
    console.log("Jay's Interactive Portfolio is fully operational!");
});
