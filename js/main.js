/**
 * TRANSCIL Main JavaScript File
 * Initializes all modules and handles page-level functionality
 */

// Page loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Create and add page loader
const createLoader = () => {
    if (document.readyState === 'loading') {
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
    }
};

// Initialize loader
createLoader();

// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

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
    
    // Track button clicks
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (typeof Utils !== 'undefined') {
                Utils.trackEvent('button_click', { button: buttonText });
            }
        });
    });
});

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

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    console.log('Navigation event:', e.state);
});

// Print welcome message
console.log('🎨 TRANSCIL website loaded successfully!');
console.log('📦 All modules initialized');
console.log('⚡ Ready to revolutionize EV fleet operations!');

