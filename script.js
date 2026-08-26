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

// Contact / Booking form submission with CMS CRM Lead Capture
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Capture Form Data for Super Admin CRM
        try {
            const name = document.getElementById('name') ? document.getElementById('name').value : 'Guest';
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
            const roomType = document.getElementById('room-type') ? document.getElementById('room-type').value : 'Standard AC Room';
            const checkIn = document.getElementById('check-in') ? document.getElementById('check-in').value : new Date().toISOString().slice(0,10);
            const guests = document.getElementById('guests') ? document.getElementById('guests').value : '2 Guests';

            // Retrieve from LocalStorage
            const stored = localStorage.getItem('ali_hotel_cms_db');
            let db = stored ? JSON.parse(stored) : null;
            if (db && db.inquiries) {
                db.inquiries.unshift({
                    id: 'inq_' + Date.now(),
                    name,
                    phone,
                    roomType,
                    checkIn,
                    guests,
                    dateReceived: new Date().toISOString().slice(0,10),
                    status: 'pending'
                });
                localStorage.setItem('ali_hotel_cms_db', JSON.stringify(db));
            }
        } catch (err) {
            console.error('Lead storage error', err);
        }

        submitBtn.textContent = '✓ Inquiry Sent to Hotel!';
        submitBtn.style.background = '#10b981';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled = false;
            bookingForm.reset();
        }, 3500);
    });
}

// Render CMS Announcement Bar on Public Pages
function initCmsAnnouncement() {
    try {
        const stored = localStorage.getItem('ali_hotel_cms_db');
        if (!stored) return;
        const db = JSON.parse(stored);
        if (db.announcement && db.announcement.enabled && !sessionStorage.getItem('ali_announcement_closed')) {
            const banner = document.createElement('div');
            banner.className = 'top-announcement-bar';
            banner.innerHTML = `
                <i class="fa-solid fa-sparkles" style="color:#f5d76e;"></i>
                <span>${db.announcement.text}</span>
                ${db.announcement.couponCode ? `<span class="promo-badge">PROMO: ${db.announcement.couponCode}</span>` : ''}
                <button class="close-announcement" aria-label="Close Announcement">&times;</button>
            `;

            document.body.prepend(banner);

            banner.querySelector('.close-announcement').addEventListener('click', () => {
                banner.remove();
                sessionStorage.setItem('ali_announcement_closed', 'true');
            });
        }
    } catch (e) {
        console.error('Announcement bar error', e);
    }
}

document.addEventListener('DOMContentLoaded', initCmsAnnouncement);

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

// ========================================
// DARGAH PHOTO CAROUSEL SLIDER
// ========================================
function initDargahCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const container = document.querySelector('.carousel-container');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoSlideTimer = null;

    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentIndex);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideTimer = setInterval(nextSlide, 4500);
    }

    function stopAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                prevSlide();
            }
            startAutoSlide();
        }, { passive: true });
    }

// ========================================
// DYNAMIC HOME PAGE REVIEWS LOADER
// ========================================
function loadDynamicHomeReviews() {
    const grid = document.getElementById('homeTestimonialsGrid');
    if (!grid) return;

    try {
        const raw = localStorage.getItem('ali_hotel_cms_db');
        if (raw) {
            const data = JSON.parse(raw);
            if (data && Array.isArray(data.reviews) && data.reviews.length > 0) {
                grid.innerHTML = data.reviews.slice(0, 3).map(rev => {
                    const stars = Array.from({ length: 5 }, (_, i) => 
                        `<i class="fa-solid fa-star" style="color: ${i < (rev.rating || 5) ? '#f5d76e' : '#4b5563'};"></i>`
                    ).join('');

                    return `
                        <div class="testimonial-card">
                            <div class="stars">${stars}</div>
                            <p>"${rev.text}"</p>
                            <div class="testimonial-author">
                                <strong>${rev.author}</strong>
                                <span><i class="fa-brands fa-google" style="color:#4285F4;"></i> ${rev.city || 'Google Verified Guest'}</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    } catch (err) {
        console.error('Error loading home reviews:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDargahCarousel();
    loadDynamicHomeReviews();
});

