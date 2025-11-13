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
        // this.setupCursorTrail(); // Disabled cursor trail
        this.setupCardAnimations();
    }
    
    initAOS() {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
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
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const randomDelay = Math.random() * 2;
            card.style.animationDelay = `${randomDelay}s`;
        });
        
        // Service card animations
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
});

