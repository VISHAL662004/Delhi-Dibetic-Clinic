
// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initStatsAnimation();
    initTeamCardAnimations();
    initAccreditationAnimations();
    initTimelineAnimations();
});

// Statistics counter animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateStatNumber(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateStatNumber(element) {
    const finalValue = element.textContent;
    const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 2500;
    const startTime = performance.now();
    const hasPlus = finalValue.includes('+');
    const hasDivision = finalValue.includes('/');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(numericValue * easeOutCubic);
        
        let displayValue = currentValue.toLocaleString();
        if (hasPlus) displayValue += '+';
        if (hasDivision) displayValue += '/7';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalValue; // Ensure final value is exact
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Team member card animations
function initTeamCardAnimations() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const image = this.querySelector('.member-image img');
            const info = this.querySelector('.member-info');
            
            if (image) {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            }
            
            if (info) {
                info.style.transform = 'translateY(-5px)';
            }
            
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(0, 123, 255, 0.15)';
        });
        
        member.addEventListener('mouseleave', function() {
            const image = this.querySelector('.member-image img');
            const info = this.querySelector('.member-info');
            
            if (image) {
                image.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (info) {
                info.style.transform = 'translateY(0)';
            }
            
            this.style.boxShadow = '';
        });
    });
}

// Accreditation animations
function initAccreditationAnimations() {
    const accreditationItems = document.querySelectorAll('.accreditation-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const icon = entry.target.querySelector('.accreditation-icon');
                if (icon) {
                    icon.style.animation = 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }
            }
        });
    }, { threshold: 0.3 });
    
    accreditationItems.forEach(item => {
        observer.observe(item);
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.accreditation-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.background = 'var(--gradient-primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.accreditation-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = '';
            }
        });
    });
}

// Mission, Vision, Values cards animation
function initTimelineAnimations() {
    const mvvCards = document.querySelectorAll('.mvv-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    mvvCards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s`;
        
        observer.observe(card);
        
        // Add interactive hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            
            const icon = this.querySelector('.mvv-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.mvv-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
}

// Add parallax effect to about content
function initParallaxEffect() {
    const aboutImage = document.querySelector('.about-image img');
    
    if (!aboutImage) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.1;
        
        aboutImage.style.transform = `translateY(${parallax}px)`;
    }, 16));
}

// Initialize page-specific scroll animations
function initPageScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS animations for about page
const aboutAnimations = `
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) rotate(-120deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.05) rotate(10deg);
        }
        70% {
            transform: scale(0.9) rotate(-5deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4);
        }
        70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .team-member {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .member-image img {
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .member-info {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .accreditation-icon {
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .stat-item {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .stat-item:nth-child(1) { animation-delay: 0.1s; }
    .stat-item:nth-child(2) { animation-delay: 0.2s; }
    .stat-item:nth-child(3) { animation-delay: 0.3s; }
    .stat-item:nth-child(4) { animation-delay: 0.4s; }
`;

const aboutStyleSheet = document.createElement('style');
aboutStyleSheet.textContent = aboutAnimations;
document.head.appendChild(aboutStyleSheet);

// Initialize additional effects after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initParallaxEffect();
        initPageScrollAnimations();
    }, 500);
});

// Add loading effects for images
function initImageLoadingEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
}

// Initialize image loading effects
document.addEventListener('DOMContentLoaded', initImageLoadingEffects);

console.log('📋 About page JavaScript initialized');
