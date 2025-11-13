/**
 * TRANSCIL Animations Module
 * Handles all animation functionality including AOS, counters, and custom effects
 */

class Animations {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.setupCounters();
        this.setupParallax();
        this.setupScrollReveal();
        this.setupMagneticButtons();
        this.setupRippleEffects();
        this.setupCardAnimations();
        this.setupParticleEffects();
    }

    initAOS() {
        AOS.init({
            duration: 1000,
            once: false,
            offset: 100,
            easing: 'ease-out-cubic',
            delay: 50,
            anchorPlacement: 'top-bottom',
            disable: window.innerWidth < 768 ? 'mobile' : false
        });
    }
    
    setupCounters() {
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
        
        document.querySelectorAll('.stat-number, .milestone-number').forEach(element => {
            counterObserver.observe(element);
        });
    }
    
    setupParallax() {
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
    }
    
    setupCursorTrail() {
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
    }
    
    setupCardAnimations() {
        // Floating cards in hero
        const floatingCards = document.querySelectorAll('.floating-card, .feature-card');
        floatingCards.forEach((card, index) => {
            const randomDelay = Math.random() * 2;
            card.style.animationDelay = `${randomDelay}s`;
        });

        // Service card animations with tilt effect
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.animation = 'float 2s ease-in-out infinite';
                }
            });

            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                if (icon) {
                    icon.style.animation = '';
                }
            });

            // 3D tilt effect
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Pricing card animations
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
    }

    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.scroll-reveal');

        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;

                if (isVisible) {
                    element.classList.add('revealed');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
    }

    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .slide-btn');

        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    setupRippleEffects() {
        const buttons = document.querySelectorAll('.btn, .slide-btn');

        buttons.forEach(button => {
            button.classList.add('btn-ripple');

            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    setupParticleEffects() {
        const hero = document.querySelector('.hero-slider, .hero');
        if (!hero) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: linear-gradient(135deg, rgba(8, 145, 178, 0.4), rgba(124, 58, 237, 0.4));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: floatSlow ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            hero.appendChild(particle);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
});

