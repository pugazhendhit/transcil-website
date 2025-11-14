// Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.slider-nav .dot');
        this.prevBtn = document.querySelector('.slider-arrow.prev');
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 6000; // 6 seconds

        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        // Show first slide
        this.showSlide(0);
        
        // Add event listeners
        this.addEventListeners();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.hero-slider-wrapper');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    addEventListeners() {
        // Navigation arrows
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Dots navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch swipe support
        this.addSwipeSupport();
    }
    
    showSlide(index) {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
        
        // Animate numbers if present
        this.animateNumbers(this.slides[index]);
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) {
            next = 0;
        }
        this.showSlide(next);
        this.resetAutoPlay();
    }
    
    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slides.length - 1;
        }
        this.showSlide(prev);
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    animateNumbers(slide) {
        const numbers = slide.querySelectorAll('.stat-number-slider');
        numbers.forEach(number => {
            const finalValue = parseInt(number.getAttribute('data-count') || number.textContent);
            const duration = 1500;
            const increment = finalValue / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    number.textContent = finalValue + (number.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    addSwipeSupport() {
        const sliderContainer = document.querySelector('.hero-slider-wrapper');
        if (!sliderContainer) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                this.nextSlide();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                this.prevSlide();
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
}

// Initialize slider when DOM is loaded
let heroSliderInstance;
document.addEventListener('DOMContentLoaded', () => {
    heroSliderInstance = new HeroSlider();
});

// Global functions for onclick handlers
function changeSlide(direction) {
    if (heroSliderInstance) {
        if (direction > 0) {
            heroSliderInstance.nextSlide();
        } else {
            heroSliderInstance.prevSlide();
        }
    }
}

function goToSlide(index) {
    if (heroSliderInstance) {
        heroSliderInstance.goToSlide(index - 1); // Convert to 0-based index
    }
}

