document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons
    lucide.createIcons();

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---------------------------------------------------------
    // Sticky header background on scroll
    // ---------------------------------------------------------
    const header = document.getElementById('siteHeader');
    const onScrollHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('bg-zinc-950/80', 'backdrop-blur-md', 'border-white/10');
        } else {
            header.classList.remove('bg-zinc-950/80', 'backdrop-blur-md', 'border-white/10');
        }
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    // ---------------------------------------------------------
    // Mobile menu toggle
    // ---------------------------------------------------------
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const barTop = document.getElementById('barTop');
    const barMid = document.getElementById('barMid');
    const barBot = document.getElementById('barBot');
    let menuOpen = false;

    function setMenu(open) {
        menuOpen = open;
        burgerBtn.setAttribute('aria-expanded', String(open));
        if (open) {
            mobileMenu.classList.remove('hidden-menu');
            requestAnimationFrame(() => mobileMenu.classList.add('menu-open'));
            barTop.style.transform = 'translateY(6.5px) rotate(45deg)';
            barBot.style.transform = 'translateY(-6.5px) rotate(-45deg)';
            barMid.style.opacity = '0';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('menu-open');
            barTop.style.transform = '';
            barBot.style.transform = '';
            barMid.style.opacity = '1';
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!menuOpen) mobileMenu.classList.add('hidden-menu');
            }, 500);
        }
    }

    burgerBtn.addEventListener('click', () => setMenu(!menuOpen));
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    // ---------------------------------------------------------
    // Smooth scroll for anchor links (native scroll-behavior handles
    // most cases; this ensures offset for the fixed header)
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length <= 1) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const headerOffset = 88;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // ---------------------------------------------------------
    // Intersection Observer — fade-in-up reveal on scroll
    // ---------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // ---------------------------------------------------------
    // Application form validation
    // ---------------------------------------------------------
    const applyForm = document.getElementById('applyForm');
    const formSuccess = document.getElementById('formSuccess');

    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const goal = document.getElementById('goal');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        [fullName, email, goal].forEach(field => {
            const errorMsg = field.closest('div').querySelector('.error-msg');
            let fieldValid = true;

            if (field === email) {
                fieldValid = emailPattern.test(field.value.trim());
            } else {
                fieldValid = field.value.trim().length > 0;
            }

            if (!fieldValid) {
                valid = false;
                field.classList.add('border-red-400/70');
                if (errorMsg) errorMsg.classList.remove('hidden');
            } else {
                field.classList.remove('border-red-400/70');
                if (errorMsg) errorMsg.classList.add('hidden');
            }
        });

        if (valid) {
            formSuccess.classList.remove('hidden');
            applyForm.reset();
            setTimeout(() => formSuccess.classList.add('hidden'), 6000);
        }
    });

    // Clear validation styling as the user corrects a field
    applyForm.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('input', () => {
            field.classList.remove('border-red-400/70');
            const errorMsg = field.closest('div').querySelector('.error-msg');
            if (errorMsg) errorMsg.classList.add('hidden');
        });
        field.addEventListener('change', () => {
            field.classList.remove('border-red-400/70');
            const errorMsg = field.closest('div').querySelector('.error-msg');
            if (errorMsg) errorMsg.classList.add('hidden');
        });
    });

    // ---------------------------------------------------------
    // Newsletter form (footer)
    // ---------------------------------------------------------
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('newsletterEmail');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(input.value.trim())) {
            input.value = '';
            input.placeholder = 'Subscribed — welcome.';
        } else {
            input.classList.add('border-red-400/70');
        }
    });

});