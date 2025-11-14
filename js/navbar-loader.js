/**
 * TRANSCIL Navbar Loader
 * Loads the navbar component dynamically on all pages
 */

// Function to load navbar
async function loadNavbar() {
    try {
        // Determine the correct path based on current location
        const currentPath = window.location.pathname;
        const isInPages = currentPath.includes('/pages/');
        const navbarPath = isInPages ? '../components/navbar.html' : 'components/navbar.html';

        // Fetch the navbar HTML
        const response = await fetch(navbarPath);
        if (!response.ok) {
            throw new Error(`Failed to load navbar: ${response.status}`);
        }

        const navbarHTML = await response.text();

        // Insert navbar at the beginning of body
        const navbarContainer = document.getElementById('navbar-placeholder');
        if (navbarContainer) {
            navbarContainer.innerHTML = navbarHTML;
        } else {
            // If no placeholder, insert at beginning of body
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        }

        // Fix paths for pages in subdirectory
        if (isInPages) {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                // Update all links to use relative paths
                navbar.querySelectorAll('a[href^="/"]').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('/index.html')) {
                        link.setAttribute('href', '../index.html' + (href.includes('#') ? href.substring(href.indexOf('#')) : ''));
                    } else if (href.startsWith('/pages/')) {
                        link.setAttribute('href', href.replace('/pages/', ''));
                    }
                });
            }
        }

        // Set active link based on current page
        setActiveNavLink();

        // Initialize hamburger menu
        initializeHamburgerMenu();

    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Function to set active nav link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Check if current page matches the link
        if (currentPath.includes('bike-models') && href.includes('bike-models')) {
            link.classList.add('active');
        } else if (currentPath.includes('partners') && href.includes('partners')) {
            link.classList.add('active');
        } else if (currentPath.includes('leadership') && href.includes('leadership')) {
            link.classList.add('active');
        } else if (currentPath.includes('contact') && href.includes('contact')) {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.includes('index.html')) && href.includes('#home')) {
            link.classList.add('active');
        }
    });
}

// Function to initialize hamburger menu
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
