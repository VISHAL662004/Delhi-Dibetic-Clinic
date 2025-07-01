
// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize home page specific functionality
    initHeroAnimations();
    initCounterAnimations();
    initServiceCardAnimations();
    initDoctorCardHovers();
    initParallaxEffects();
});

// Hero Section Animations
function initHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        // Stagger animation for hero elements
        const heroElements = heroText.querySelectorAll('.fade-in-up');
        heroElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Add floating animation to hero image
        if (heroImage.querySelector('img')) {
            setInterval(() => {
                const img = heroImage.querySelector('img');
                img.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px) scale(1.02)`;
            }, 16);
        }
    }
}

// Counter Animations for Statistics
function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(number)) return;
    
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (number - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString() + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Service Card Animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceLink = card.querySelector('.service-link');
        
        card.addEventListener('mouseenter', function() {
            // Add pulse effect to icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'pulse 0.6s ease-in-out';
            }
            
            // Animate service link
            if (serviceLink) {
                serviceLink.style.transform = 'translateX(10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = '';
            }
            
            if (serviceLink) {
                serviceLink.style.transform = 'translateX(0)';
            }
        });
    });
}

// Doctor Card Hover Effects
function initDoctorCardHovers() {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const contactLinks = card.querySelectorAll('.doctor-contact a');
            
            // Stagger animation for contact links
            contactLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'translateY(-5px) scale(1.1)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const contactLinks = card.querySelectorAll('.doctor-contact a');
            
            contactLinks.forEach(link => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-pattern, .cta-section::before');
    
    if (parallaxElements.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.style) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Use throttled scroll event for better performance
    window.addEventListener('scroll', throttle(updateParallax, 16));
}

// Feature Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create ripple effect
            createRippleEffect(card);
            
            // Scale icon with bounce effect
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.animation = 'bounceScale 0.6s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
});

// Create ripple effect for cards
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 123, 255, 0.1)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animations for home page
const homeAnimations = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounceScale {
        0% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(10deg); }
        100% { transform: scale(1.1); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .hero-image img {
        animation: float 6s ease-in-out infinite;
    }
    
    .feature-icon {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .doctor-contact a {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .service-link {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
`;

// Add the animations to the document
const homeStyleSheet = document.createElement('style');
homeStyleSheet.textContent = homeAnimations;
document.head.appendChild(homeStyleSheet);

// Initialize scroll-triggered animations with intersection observer
function initAdvancedScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate-in');
                
                // Special handling for different sections
                if (element.classList.contains('features-grid')) {
                    animateGridItems(element, '.feature-card');
                } else if (element.classList.contains('services-grid')) {
                    animateGridItems(element, '.service-card');
                } else if (element.classList.contains('doctors-grid')) {
                    animateGridItems(element, '.doctor-card');
                }
            }
        });
    }, observerOptions);
    
    // Observe main sections
    const sections = document.querySelectorAll('.why-choose-us, .services-overview, .doctors-section, .cta-section');
    sections.forEach(section => observer.observe(section));
}

// Animate grid items with stagger effect
function animateGridItems(container, selector) {
    const items = container.querySelectorAll(selector);
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize advanced animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAdvancedScrollAnimations, 1000);
});

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🚀 Page loaded in ${loadTime}ms`);
        }, 0);
    });
}
