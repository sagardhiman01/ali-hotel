// ========================================
// MOBILE MENU DRAWER CONTROLLER
// ========================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Create backdrop overlay if not present in HTML
let navOverlay = document.getElementById('nav-overlay');
if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.id = 'nav-overlay';
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
}

function openMobileMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (mobileMenu) {
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-expanded', 'true');
    }
    if (navOverlay) navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    }
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

function toggleMobileMenu() {
    if (navLinks && navLinks.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (mobileMenu) {
    mobileMenu.setAttribute('aria-label', 'Toggle Navigation Menu');
    mobileMenu.setAttribute('aria-expanded', 'false');
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        closeMobileMenu();
    });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Close drawer if window is resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll-based reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.room-card, .amenity-card, .amenity-item, .testimonial-card, .value-card, .stat-item, .about-story-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Staggered animation for grid children
document.querySelectorAll('.room-grid, .amenities-grid, .amenities-grid-home, .testimonial-grid, .values-grid, .stats-grid').forEach(grid => {
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 120);
                });
                gridObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    gridObserver.observe(grid);
});

// Contact form submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Request Submitted!';
        submitBtn.style.background = '#10b981';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            bookingForm.reset();
        }, 3000);
    });
}

// Smooth counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = element.dataset.suffix || '';
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Animate stats when visible
document.querySelectorAll('.stat-number').forEach(stat => {
    const text = stat.textContent;
    const numMatch = text.match(/(\d+)/);
    if (numMatch) {
        const num = parseInt(numMatch[1]);
        const suffix = text.replace(numMatch[1], '');
        stat.dataset.suffix = suffix;
        stat.dataset.target = num;

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, parseInt(entry.target.dataset.target));
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(stat);
    }
});
