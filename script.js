document.addEventListener('DOMContentLoaded', () => {
    
    // --- Responsive Mobile Navigation Logic ---
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('open');
        
        // Elegant transformation lines for high-end feel
        const bars = menuBtn.querySelectorAll('.bar');
        if (menuBtn.classList.contains('open')) {
            bars[0].style.transform = 'translateY(3px) rotate(45deg)';
            bars[1].style.transform = 'translateY(-4px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.transform = 'none';
        }
    });

    // Dismiss menu panel upon navigation link execution
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('open');
            menuBtn.querySelectorAll('.bar').forEach(b => b.style.transform = 'none');
        });
    });

    // --- Dynamic Portfolio Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const filterCriterion = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterCriterion === 'all' || card.getAttribute('data-category') === filterCriterion) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- Dynamic Scroll Spy for Navigation Highlighting ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    // --- Scroll-triggered Fade-in Animation for Project Cards ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- Production Form Interception ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Placeholder for asynchronous server submission hook (Netlify forms/Formspree)
        alert('Inquiry successfully logged. Thank you.');
        contactForm.reset();
    });
});