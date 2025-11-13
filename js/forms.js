/**
 * TRANSCIL Forms Module
 * Handles all form submissions and validations
 */

class Forms {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        if (this.contactForm) {
            this.setupContactForm();
        }
        this.setupPricingButtons();
    }
    
    setupContactForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = this.contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(this.contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual API call)
            this.submitContactForm(data)
                .then(response => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    this.showNotification('Thank you! We\'ll get back to you soon.', 'success');
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                        this.contactForm.reset();
                    }, 2000);
                })
                .catch(error => {
                    submitButton.innerHTML = '<i class="fas fa-times"></i> Error';
                    this.showNotification('Something went wrong. Please try again.', 'error');
                    setTimeout(() => {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                });
        });
    }
    
    async submitContactForm(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 2000);
        });
        
        // Actual implementation would be:
        // return fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).then(response => response.json());
    }
    
    setupPricingButtons() {
        const pricingButtons = document.querySelectorAll('.btn-pricing');
        pricingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = button.closest('.pricing-card');
                const planName = card.querySelector('.pricing-title').textContent;
                this.showNotification(`Interested in ${planName}? Contact us to get started!`, 'success');
                
                // Scroll to contact form
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1000);
            });
        });
    }
    
    showNotification(message, type = 'success') {
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
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
`;
document.head.appendChild(notificationStyle);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Forms();
});

