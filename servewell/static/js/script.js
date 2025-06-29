// ServeWell JavaScript with GSAP animations

// Initialize GSAP animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
        }
        
        // Initialize all features
        initAnimations();
        initDonationForm();
        initMobileMenu();
        initCounters();
        initLiveStats();
        initActivityFeed();
        initProgressBars();
        initFloatingAnimations();
        initSmoothScrolling();
        initScrollAnimations();
        initFlashMessages();
        initKeyboardNavigation();
        initNewsletterForm();
        initParallaxEffects();
        initCardInteractions();
        initTypewriterEffect();
        initDynamicBackgrounds();
        initEasterEggs();
        initFoodCategories();
        initFoodStats();
        initFoodInteractions();
        initSpectacularEffects();
        initRainbowText();
        initScrollToTop();
        
        // Add loading animation
        gsap.from('body', {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    } else {
        console.warn('GSAP or ScrollTrigger not loaded, using fallback animations');
        // Add class to enable CSS fallback animations
        document.body.classList.add('no-gsap');
        
        // Initialize features that don't require GSAP
        initMobileMenu();
        initCounters(); // Has fallback
        initFlashMessages();
        initNewsletterForm();
        initFoodCategories(); // Food interactions don't require GSAP
        initFoodStats();
        initFoodInteractions();
        
        // Simple fade-in for body
        document.body.style.opacity = '1';
    }
});

// GSAP Animations
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    try {
        // Fade in elements with class 'fade-in'
        gsap.from('.fade-in', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Animate feature cards with ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.from('.feature-card', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.feature-card',
                    start: 'top 80%',
                    toggleActions: "play none none reverse"
                }
            });
        }

        // Animate stats cards on dashboard
        if (document.querySelector('.stats-card')) {
            gsap.from('.stats-card', {
                duration: 0.6,
                scale: 0.8,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)"
            });
        }

    // Hero section text animation
    if (document.querySelector('.hero-section')) {
        const tl = gsap.timeline();
        tl.from('.hero-section h2', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "power3.out"
        })
        .from('.hero-section p', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from('.hero-section .fade-in', {
            duration: 0.6,
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.3");
    }

    // Floating icons animation
    if (document.querySelectorAll('.floating-icon').length > 0) {
        gsap.to('.floating-icon', {
            y: -20,
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.5
        });
    }        // Donate form animation
        if (document.querySelector('.donate-form')) {
            gsap.from('.donate-form', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out",
                delay: 0.2
            });
        }
    } catch (error) {
        console.warn('Error in GSAP animations:', error);
    }
}

// Enhanced counter animation for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback: Simple number animation without GSAP
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.innerText = Math.ceil(current).toLocaleString();
            }, 20);
        });
        return;
    }
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    duration: 2.5,
                    innerText: target,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    onUpdate: function() {
                        counter.innerText = Math.ceil(counter.innerText).toLocaleString();
                    }
                });
            }
        });
    });
}

// Live statistics update simulation
function initLiveStats() {
    const statsCounters = document.querySelectorAll('.counter');
    
    // Simulate live updates every 30 seconds
    setInterval(() => {
        statsCounters.forEach(counter => {
            const currentValue = parseInt(counter.innerText.replace(/,/g, ''));
            const increment = Math.floor(Math.random() * 5) + 1; // Random increment 1-5
            const newValue = currentValue + increment;
            
            gsap.to(counter, {
                duration: 1,
                innerText: newValue,
                snap: { innerText: 1 },
                ease: "power2.out",
                onUpdate: function() {
                    counter.innerText = Math.ceil(counter.innerText).toLocaleString();
                }
            });
        });
    }, 30000); // Update every 30 seconds
}

// Activity feed animations
function initActivityFeed() {
    const activities = document.querySelectorAll('.activity-item');
    
    if (activities.length > 0) {
        gsap.from('.activity-item', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.activity-item',
                start: 'top 90%',
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Enhanced progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(bar, {
                    duration: 2,
                    width: width,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Floating animation for hero section icons
function initFloatingAnimations() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        gsap.to(icon, {
            y: -15,
            duration: 2 + (index * 0.5),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.3
        });
        
        gsap.to(icon, {
            rotation: 5,
            duration: 3 + (index * 0.2),
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
        });
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Feature cards interactive hover
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Button hover animations
    document.querySelectorAll('a[class*="bg-"], button[class*="bg-"]').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
}

// Smooth scroll for anchor links
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                    // Use GSAP ScrollToPlugin for smooth scrolling
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: targetElement.offsetTop - 80,
                        ease: "power2.inOut"
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Simple particle background effect
function initParticleBackground() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
        `;
        
        hero.appendChild(particle);
        
        // Random position
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
        });
        
        // Floating animation
        gsap.to(particle, {
            y: "-=100",
            duration: Math.random() * 3 + 2,
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
        });
        
        gsap.to(particle, {
            x: "+=50",
            duration: Math.random() * 4 + 3,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
        });
    }
}

// Enhanced form validation and UX
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add focus animations
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            input.addEventListener('blur', () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            // Real-time validation visual feedback
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.style.borderColor = '#10b981';
                    input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                } else {
                    input.style.borderColor = '#ef4444';
                    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                }
            });
        });
    });
}

// Loading state management
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="loading-spinner"></i> Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Toast notification system
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
        ${message}
        <button onclick="this.parentElement.remove()" class="ml-2 text-lg font-bold">&times;</button>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Keyboard navigation enhancement
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close modals/menus
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
            
            // Close any open flash messages
            const flashMessages = document.querySelectorAll('.alert');
            flashMessages.forEach(msg => msg.remove());
        }
    });
}

// Enhanced newsletter subscription
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const name = form.querySelector('input[type="text"]').value;
            const role = form.querySelector('select').value;
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Welcome to Our Community!';
                submitBtn.classList.remove('from-yellow-400', 'to-orange-500');
                submitBtn.classList.add('from-green-400', 'to-green-500');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center';
                successMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Thank you for joining our community! Check your email for a welcome message.';
                form.appendChild(successMsg);
                
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('from-green-400', 'to-green-500');
                    submitBtn.classList.add('from-yellow-400', 'to-orange-500');
                    successMsg.remove();
                }, 3000);
            }, 2000);
        });
    }
}

// Enhanced scroll animations with stagger
function initScrollAnimations() {
    // Animate elements on scroll with different delays
    const animateElements = [
        { selector: '.feature-card', animation: { y: 50, opacity: 0, duration: 0.8, stagger: 0.2 } },
        { selector: '.stats-card', animation: { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1 } },
        { selector: '.testimonial-card', animation: { y: 30, opacity: 0, duration: 0.7, stagger: 0.15 } },
        { selector: '.timeline-item', animation: { x: -50, opacity: 0, duration: 0.6, stagger: 0.2 } }
    ];
    
    animateElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.from(elements, {
                ...animation,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elements[0],
                    start: 'top 85%',
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
}

// Parallax scrolling effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        gsap.to(element, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Interactive hover effects for cards
function initCardInteractions() {
    const cards = document.querySelectorAll('.feature-card, .stats-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                rotation: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Typewriter effect for quotes
function initTypewriterEffect() {
    const quotes = document.querySelectorAll('.typewriter-quote');
    
    quotes.forEach(quote => {
        const text = quote.textContent;
        quote.textContent = '';
        
        ScrollTrigger.create({
            trigger: quote,
            start: 'top 80%',
            onEnter: () => {
                let i = 0;
                const timer = setInterval(() => {
                    quote.textContent += text[i];
                    i++;
                    if (i === text.length) {
                        clearInterval(timer);
                    }
                }, 50);
            }
        });
    });
}

// Dynamic background color changes
function initDynamicBackgrounds() {
    const sections = document.querySelectorAll('section[data-bg-color]');
    
    sections.forEach(section => {
        const bgColor = section.dataset.bgColor;
        
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => {
                gsap.to(document.body, {
                    backgroundColor: bgColor,
                    duration: 0.5
                });
            },
            onLeave: () => {
                gsap.to(document.body, {
                    backgroundColor: '#f9fafb',
                    duration: 0.5
                });
            }
        });
    });
}

// Enhanced mobile menu with animations
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        let isOpen = false;
        
        mobileMenuButton.addEventListener('click', () => {
            isOpen = !isOpen;
            
            if (isOpen) {
                gsap.to(mobileMenu, {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                mobileMenu.classList.add('open');
            } else {
                gsap.to(mobileMenu, {
                    x: '-100%',
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                });
                mobileMenu.classList.remove('open');
            }
            
            // Animate hamburger icon
            const icon = mobileMenuButton.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Easter eggs and fun interactions
function initEasterEggs() {
    // Konami code easter egg
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Trigger special animation
                gsap.to('body', {
                    rotation: 360,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        alert('🎉 You found the secret! Thanks for exploring ServeWell!');
                        gsap.set('body', { rotation: 0 });
                    }
                });
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Click counter on logo
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                gsap.to('.floating-icon', {
                    scale: 1.5,
                    rotation: 360,
                    duration: 1,
                    stagger: 0.1,
                    yoyo: true,
                    repeat: 1
                });
                clickCount = 0;
            }
        });
    }
}

// Initialize food category interactions
function initFoodCategories() {
    const foodCards = document.querySelectorAll('.food-category-card');
    
    foodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add floating animation to emoji
            const emoji = this.querySelector('.text-4xl');
            if (emoji) {
                emoji.style.animation = 'float 1s ease-in-out infinite';
            }
            
            // Show impact text with animation
            const impactText = this.querySelector('.opacity-0');
            if (impactText) {
                impactText.classList.remove('opacity-0');
                impactText.classList.add('opacity-100');
                
                // Add GSAP animation if available
                if (typeof gsap !== 'undefined') {
                    gsap.from(impactText, {
                        y: 10,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove floating animation
            const emoji = this.querySelector('.text-4xl');
            if (emoji) {
                emoji.style.animation = '';
            }
            
            // Hide impact text
            const impactText = this.querySelector('.opacity-100');
            if (impactText) {
                impactText.classList.remove('opacity-100');
                impactText.classList.add('opacity-0');
            }
        });
        
        // Add click interaction
        card.addEventListener('click', function() {
            const category = this.querySelector('h4').textContent;
            
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
            notification.textContent = `Great choice! ${category} are highly needed.`;
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        });
    });
}

// Enhanced statistics animation with food themes
function initFoodStats() {
    const statCards = document.querySelectorAll('.stats-card');
    
    statCards.forEach((card, index) => {
        // Add staggered entrance animation
        if (typeof gsap !== 'undefined') {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
        
        // Add hover effect with food-related animations
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize food-related interactions
function initFoodInteractions() {
    // Food safety guidelines animation
    const guidelines = document.querySelectorAll('.safety-guideline');
    guidelines.forEach((guideline, index) => {
        if (typeof gsap !== 'undefined') {
            gsap.from(guideline, {
                x: -30,
                opacity: 0,
                duration: 0.5,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: guideline,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
    
    // Add click animations to food icons
    const foodEmojis = document.querySelectorAll('.food-category-card .text-4xl');
    foodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create ripple effect
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    scale: 1.3,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// Geo-Tagging Placeholder (requires Google Maps API key)
function initMap() {
    // Initialize Google Maps for donation location (requires API key)
    console.log('Google Maps API placeholder for geo-tagging');
}

// Volunteer Rewards Placeholder
function showRewardPoints() {
    // Placeholder: Fetch and display reward points from backend
    alert('Your impact: 100 meals donated!');
}

// Add spectacular visual effects
function initSpectacularEffects() {
    // Create floating particles
    createFloatingParticles();
    
    // Add scroll-triggered animations
    initScrollEffects();
    
    // Add typing effect to hero text
    initTypingEffect();
    
    // Add magnetic hover effects
    initMagneticEffects();
    
    // Add color-changing background
    initDynamicBackground();
}

// Create floating food particles
function createFloatingParticles() {
    const particles = ['🍎', '🥕', '🍞', '🥛', '🌾', '🍲', '❤️', '✨'];
    const container = document.body;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.className = 'fixed pointer-events-none z-10 text-2xl opacity-20';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            container.appendChild(particle);
            
            // Animate particle floating up
            if (typeof gsap !== 'undefined') {
                gsap.to(particle, {
                    y: -window.innerHeight - 100,
                    x: (Math.random() - 0.5) * 200,
                    rotation: Math.random() * 360,
                    duration: Math.random() * 8 + 5,
                    ease: "none",
                    onComplete: () => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }
                });
            } else {
                // CSS fallback
                particle.style.animation = `float ${Math.random() * 8 + 5}s linear forwards`;
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, (Math.random() * 8 + 5) * 1000);
            }
        }, i * 2000);
    }
    
    // Restart particle creation
    setTimeout(createFloatingParticles, 30000);
}

// Enhanced scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add special effects for different elements
                if (entry.target.classList.contains('stats-card')) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                }
                
                if (entry.target.classList.contains('food-category-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            entry.target.style.transform = 'scale(1)';
                        }, 200);
                    }, Math.random() * 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .stats-card, .food-category-card, section').forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for hero text
function initTypingEffect() {
    const heroTitle = document.querySelector('h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Magnetic hover effects
function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.bg-gradient-to-r, .food-category-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            if (typeof gsap !== 'undefined') {
                gsap.to(element, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Dynamic background color changes
function initDynamicBackground() {
    const colors = [
        'from-orange-500 via-red-500 to-pink-600',
        'from-purple-500 via-pink-500 to-red-500',
        'from-blue-500 via-purple-500 to-pink-500',
        'from-green-500 via-blue-500 to-purple-500'
    ];
    
    let currentIndex = 0;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % colors.length;
            heroSection.className = heroSection.className.replace(
                /from-\w+-\d+\s+via-\w+-\d+\s+to-\w+-\d+/,
                colors[currentIndex]
            );
        }, 10000);
    }
}

// Add sparkle effects on click
function addSparkleEffect(x, y) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'fixed pointer-events-none z-50';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.backgroundColor = '#ffd700';
        sparkle.style.borderRadius = '50%';
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(sparkle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }
            });
        } else {
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 800);
        }
    }
}

// Add click sparkle effects to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn-enhanced, .food-category-card')) {
        addSparkleEffect(e.clientX, e.clientY);
    }
});

// Add rainbow text effect
function initRainbowText() {
    const rainbowElements = document.querySelectorAll('.gradient-text');
    rainbowElements.forEach(element => {
        element.style.backgroundImage = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)';
        element.style.backgroundSize = '400% 400%';
        element.style.animation = 'gradient-shift 3s ease infinite';
    });
}

// Enhanced loading screen management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Hide loading screen after everything is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                        }
                    });
                } else {
                    loadingScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 800);
                }
            }, 1500); // Show loading for at least 1.5 seconds
        });
    }
}

// Initialize loading screen immediately
initLoadingScreen();

// Scroll to top button functionality
function initScrollToTop() {
    const scrollButton = document.getElementById('scroll-to-top');
    
    if (scrollButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.pointerEvents = 'auto';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.pointerEvents = 'none';
            }
        });
        
        // Smooth scroll to top
        scrollButton.addEventListener('click', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                gsap.to(window, {
                    scrollTo: 0,
                    duration: 1.5,
                    ease: "power2.out"
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Add click effect
            addSparkleEffect(
                scrollButton.getBoundingClientRect().left + scrollButton.offsetWidth / 2,
                scrollButton.getBoundingClientRect().top + scrollButton.offsetHeight / 2
            );
        });
    }
}

// Missing function definitions
function initDonationForm() {
    const donationForms = document.querySelectorAll('form[action*="donate"]');
    donationForms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add focus/blur animations
            input.addEventListener('focus', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1.02,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
                this.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.2,
                        ease: "power2.out"
                    });
                }
                this.classList.remove('focused');
            });
        });
        
        // Add submit animation
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
            }
        });
    });
}

// Flash messages initialization
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message, .alert');
    
    flashMessages.forEach((message, index) => {
        if (typeof gsap !== 'undefined') {
            // Animate in
            gsap.from(message, {
                opacity: 0,
                y: -50,
                duration: 0.5,
                delay: index * 0.1,
                ease: "back.out(1.7)"
            });
            
            // Auto-hide after 5 seconds
            gsap.to(message, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                delay: 5 + (index * 0.1),
                ease: "power2.in",
                onComplete: () => {
                    message.style.display = 'none';
                }
            });
        } else {
            // CSS fallback
            message.style.animation = 'slideInDown 0.5s ease-out forwards';
            setTimeout(() => {
                message.style.animation = 'slideOutUp 0.3s ease-in forwards';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 300);
            }, 5000);
        }
        
        // Add close button functionality
        const closeBtn = message.querySelector('.close, .btn-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(message, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            message.style.display = 'none';
                        }
                    });
                } else {
                    message.style.display = 'none';
                }
            });
        }
    });
}