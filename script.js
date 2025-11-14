// Pre-loader - Hide faster
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Hide preloader quickly after DOM is ready
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 100);
    }
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        const button = window.event ? window.event.target.closest('.copy-btn') : null;
        if (button) {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
            button.style.background = '#25D366';
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
        }
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy. Please copy manually: ' + text);
    });
}

// Initialize copy buttons with proper event handling
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const detailItem = this.closest('.payment-detail-item');
            if (detailItem) {
                const valueElement = detailItem.querySelector('.detail-value');
                if (valueElement) {
                    const textToCopy = valueElement.textContent.trim();
                    navigator.clipboard.writeText(textToCopy).then(function() {
                        const originalHTML = button.innerHTML;
                        button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
                        button.style.background = '#25D366';
                        setTimeout(() => {
                            button.innerHTML = originalHTML;
                            button.style.background = '';
                        }, 2000);
                    }).catch(function(err) {
                        console.error('Failed to copy text: ', err);
                        alert('Failed to copy. Please copy manually: ' + textToCopy);
                    });
                }
            }
        });
    });
});

// Initialize embeds after page fully loads
window.addEventListener('load', function() {
    // Initialize Facebook embeds
    if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
    }
    
    // Initialize Instagram embeds
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Dropdown Menu for Mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Gallery Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(this);
        
        // Simulate form submission
        formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        formMessage.className = 'form-message success';
        
        // Reset form
        this.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Donate Form
const donateForm = document.getElementById('donateForm');
if (donateForm) {
    // Amount button selection
    const amountButtons = document.querySelectorAll('.amount-btn');
    const amountInput = document.getElementById('donation-amount');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            amountInput.value = this.getAttribute('data-amount');
        });
    });
    
    // Form submission
    donateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const donateMessage = document.getElementById('donateMessage');
        const formData = new FormData(this);
        const amount = formData.get('amount');
        
        if (!amount || amount <= 0) {
            donateMessage.textContent = 'Please enter a valid donation amount.';
            donateMessage.className = 'form-message error';
            donateMessage.style.display = 'block';
            return;
        }
        
        // Simulate donation processing
        donateMessage.textContent = `Thank you for your donation of GHS ${amount}! You will be redirected to the payment gateway.`;
        donateMessage.className = 'form-message success';
        donateMessage.style.display = 'block';
        
        // In a real implementation, you would redirect to payment gateway here
        // window.location.href = 'payment-gateway-url';
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reading Progress Bar
const readingProgress = document.getElementById('readingProgress');
if (readingProgress) {
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        readingProgress.style.width = scrolled + '%';
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = '';
    }
    
    lastScroll = currentScroll;
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .program-card, .blog-card, .gallery-item, .value-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Page Highlight
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Handle dropdown active state
const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
dropdownLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
        link.closest('.dropdown').querySelector('> a').classList.add('active');
    }
});

// Fetch Open Graph images for articles
function fetchOGImage(url, imgElement) {
    // Use a proxy service or direct fetch
    // For now, we'll use the article URL structure to guess the image
    // In production, you might want to use a backend service to fetch og:image
    
    // Try to extract domain and create a likely image path
    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;
        const path = urlObj.pathname;
        
        // Common Open Graph image patterns
        const ogImageUrls = [
            `${urlObj.origin}${path}/og-image.jpg`,
            `${urlObj.origin}${path}/featured-image.jpg`,
            `${urlObj.origin}/wp-content/uploads/${path.split('/').pop()}.jpg`,
            `https://${domain}/og-image.jpg`
        ];
        
        // Try each potential image URL
        let currentIndex = 0;
        const tryNextImage = () => {
            if (currentIndex < ogImageUrls.length) {
                const testImg = new Image();
                testImg.onload = () => {
                    imgElement.src = ogImageUrls[currentIndex];
                };
                testImg.onerror = () => {
                    currentIndex++;
                    tryNextImage();
                };
                testImg.src = ogImageUrls[currentIndex];
            }
        };
        tryNextImage();
    } catch (e) {
        console.log('Could not fetch OG image:', e);
    }
}

// Initialize OG image fetching for article images
document.addEventListener('DOMContentLoaded', function() {
    const articleImages = document.querySelectorAll('.news-image img, .blog-image img');
    articleImages.forEach(img => {
        // Find the article link in the same card
        const card = img.closest('.news-card, .blog-card');
        if (card) {
            const articleLink = card.querySelector('a[href^="http"]');
            if (articleLink && articleLink.href) {
                // Only fetch if image failed to load
                img.addEventListener('error', function() {
                    fetchOGImage(articleLink.href, img);
                });
            }
        }
    });
});

