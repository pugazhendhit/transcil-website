/**
 * TRANSCIL Configuration Module
 * Contains all configuration constants and settings
 */

const CONFIG = {
    // Animation Settings
    animations: {
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    },
    
    // API Endpoints (if needed)
    api: {
        baseURL: 'https://api.transcil.com',
        endpoints: {
            contact: '/api/contact',
            subscribe: '/api/subscribe',
            partnership: '/api/partnership'
        }
    },
    
    // Contact Information
    contact: {
        phone: {
            primary: '+91 80193 55656',
            secondary: '+91 81066 20333'
        },
        email: {
            info: 'info@transcil.com',
            support: 'support@transcil.com'
        },
        address: 'Survey No 193, Electrical Vehicle Manufacturers Company, Phase-IV, Part Ida, Cherlapalli, Hyderabad, Secunderabad, Telangana 500051'
    },
    
    // Social Media Links
    social: {
        facebook: 'https://facebook.com/transcil',
        instagram: 'https://instagram.com/transcil',
        linkedin: 'https://linkedin.com/company/transcil',
        twitter: 'https://twitter.com/transcil'
    },
    
    // Analytics
    analytics: {
        enabled: true,
        trackingId: 'UA-XXXXXXXXX-X' // Replace with actual tracking ID
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

