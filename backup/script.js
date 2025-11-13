// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll to top
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated counter for statistics
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Observe elements for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number, .milestone-number').forEach(element => {
    counterObserver.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for gradient orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Cursor trail effect
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--primary-color), transparent);
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';

        requestAnimationFrame(animateTrail);
    };

    animateTrail();
};

// Initialize cursor trail
createCursorTrail();

// Form submission handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            contactForm.reset();
            
            // Show success message
            showNotification('Thank you! We\'ll get back to you soon.', 'success');
        }, 2000);
    }, 2000);
});

// Notification system
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--gradient-1)' : 'var(--gradient-2)'};
        color: var(--text-primary);
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 242, 255, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Add slide animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Pricing card hover effect
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Service card icon animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

// Floating cards animation in hero section
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    const randomDelay = Math.random() * 2;
    card.style.animationDelay = `${randomDelay}s`;
});

// Team card hover animation
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.team-overlay');
        overlay.style.opacity = '1';
    });

    card.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.team-overlay');
        overlay.style.opacity = '0';
    });
});

// Testimonial slider auto-rotate (optional)
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

const rotateTestimonials = () => {
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentTestimonial) {
            card.classList.add('active');
        }
    });

    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
};

// Auto-rotate testimonials every 5 seconds
setInterval(rotateTestimonials, 5000);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Pricing button interactions
const pricingButtons = document.querySelectorAll('.btn-pricing');
pricingButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('.pricing-title').textContent;
        showNotification(`Great choice! Redirecting to ${planName} plan...`, 'success');
        
        // You can add actual navigation or modal here
        setTimeout(() => {
            // window.location.href = '/booking?plan=' + planName;
            console.log('Navigate to booking page with plan:', planName);
        }, 2000);
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Background music control (optional - uncomment if you want to add background music)
/*
const musicButton = document.createElement('button');
musicButton.innerHTML = '<i class="fas fa-music"></i>';
musicButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-1);
    border: none;
    border-radius: 50%;
    color: var(--text-primary);
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 999;
    transition: all 0.3s ease;
`;
document.body.appendChild(musicButton);

let musicPlaying = false;
musicButton.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    musicButton.innerHTML = musicPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
    // Add your audio control logic here
});
*/

// Loading animation (shown on page load)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Add loading overlay
const createLoader = () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-charging-station" style="font-size: 4rem; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: pulse 1s infinite;"></i>
            <p style="margin-top: 1rem; color: var(--text-secondary);">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
};

// Initialize loader
if (document.readyState === 'loading') {
    createLoader();
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Trigger any scroll-based animations here
    });
}, { passive: true });

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        showNotification('🎉 You found the secret! TRANSCIL Turbo Mode Activated!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Console message for developers
console.log('%c⚡ TRANSCIL - Smart, Sustainable, Scalable ⚡', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00f2ff 0%, #7b2ff7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilding India\'s most reliable electric fleet network! 🚀', 'font-size: 14px; color: #00f2ff;');
console.log('%cInterested in partnering with us? Contact: info@transcil.com | +91 80193 55656', 'font-size: 12px; color: #7b2ff7;');

// Analytics tracking (placeholder)
const trackEvent = (eventName, eventData) => {
    console.log('Event tracked:', eventName, eventData);
    // Add your analytics tracking code here (Google Analytics, etc.)
};

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', { button: buttonText });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            trackEvent('section_view', { section: sectionId });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// Add custom cursor effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .pricing-card, .team-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    element.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

console.log('🎨 All animations and interactions loaded successfully!');

