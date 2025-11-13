/**
 * TRANSCIL Utilities Module
 * Helper functions and utilities
 */

const Utils = {
    /**
     * Track analytics event
     */
    trackEvent: (eventName, eventData) => {
        console.log('Event tracked:', eventName, eventData);
        // Add actual analytics tracking here (Google Analytics, etc.)
        if (window.gtag) {
            gtag('event', eventName, eventData);
        }
    },
    
    /**
     * Debounce function
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * Throttle function
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    /**
     * Format phone number
     */
    formatPhone: (phone) => {
        return phone.replace(/(\+\d{2})(\d{5})(\d{5})/, '$1 $2 $3');
    },
    
    /**
     * Validate email
     */
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    /**
     * Lazy load images
     */
    lazyLoadImages: () => {
        const images = document.querySelectorAll('img[data-src]');
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
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    /**
     * Easter egg - Konami code
     */
    setupKonamiCode: (callback) => {
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join('') === konamiSequence.join('')) {
                callback();
            }
        });
    }
};

// Setup utilities on load
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    Utils.lazyLoadImages();
    
    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Utils.trackEvent('section_view', { section: entry.target.id });
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Setup Konami code easter egg
    Utils.setupKonamiCode(() => {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    });
    
    // Console branding
    console.log('%c⚡ TRANSCIL - Smart, Sustainable, Scalable ⚡', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00f2ff 0%, #7b2ff7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cBuilding India\'s most reliable electric fleet network! 🚀', 'font-size: 14px; color: #00f2ff;');
    console.log('%cInterested in partnering? Contact: info@transcil.com | +91 80193 55656', 'font-size: 12px; color: #7b2ff7;');
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

