/**
 * TRANSCIL Navigation Module
 * Handles all navigation-related functionality
 */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('navLinks');
        this.scrollTop = document.getElementById('scrollTop');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollToTop();
    }
    
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            // Navbar scroll effect
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Scroll to top button visibility
            if (window.scrollY > 300) {
                this.scrollTop.classList.add('visible');
            } else {
                this.scrollTop.classList.remove('visible');
            }
        }, { passive: true });
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollToTop() {
        this.scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

