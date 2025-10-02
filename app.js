// Vue.js App
const { createApp } = Vue;

createApp({
    data() {
        return {
            isScrolled: false,
            marketNumbers: {
                tam: 0,
                india: 0,
                serviceable: 0
            },
            animationTargets: {
                tam: 50,
                india: 18,
                serviceable: 1.8
            },
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };
    },
    mounted() {
        // Disabled problematic animations and effects
        // this.initScrollAnimations();
        this.initSmoothScrolling();
        // this.initNavbarScroll();
        this.initMarketCounters();
        // this.addScrollReveal();
        // this.initParallax();
        // this.addFloatingParticles();
        this.initMicroInteractions();
    },
    methods: {
        // Initialize scroll animations with stagger support - DISABLED
        initScrollAnimations() {
            // Disabled to prevent text disappearing issues
            return;
        },

        // Smooth anchor scrolling (respects reduced motion)
        initSmoothScrolling() {
            const smoothBehavior = this.prefersReducedMotion ? 'auto' : 'smooth';
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({ top: offsetTop, behavior: smoothBehavior });
                    }
                });
            });
        },

        // Navbar scroll feedback - DISABLED
        initNavbarScroll() {
            // Disabled to prevent brightness changes
            return;
        },

        // Market counters
        initMarketCounters() {
            const marketSection = document.querySelector('#market');
            if (!marketSection) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateMarketNumbers();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(marketSection);
        },

        animateMarketNumbers() {
            if (this.prefersReducedMotion) {
                this.marketNumbers.tam = this.animationTargets.tam;
                this.marketNumbers.india = this.animationTargets.india;
                this.marketNumbers.serviceable = this.animationTargets.serviceable;
                return;
            }
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;
            let currentStep = 0;
            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                this.marketNumbers.tam = Math.round(this.animationTargets.tam * easeOutQuart * 10) / 10;
                this.marketNumbers.india = Math.round(this.animationTargets.india * easeOutQuart * 10) / 10;
                this.marketNumbers.serviceable = Math.round(this.animationTargets.serviceable * easeOutQuart * 10) / 10;
                if (currentStep >= steps) {
                    clearInterval(timer);
                    this.marketNumbers.tam = this.animationTargets.tam;
                    this.marketNumbers.india = this.animationTargets.india;
                    this.marketNumbers.serviceable = this.animationTargets.serviceable;
                }
            }, stepDuration);
        },

        // Add animation classes to sections alternately - DISABLED
        addScrollReveal() {
            // Disabled to prevent animation issues
            return;
        },

        // Parallax with rAF (reduced motion safe) - DISABLED
        initParallax() {
            // Disabled to prevent scroll-based brightness changes
            return;
        },

        // Floating particles kept minimal for performance on low-end - DISABLED
        addFloatingParticles() {
            // Disabled to prevent animation issues
            return;
        },

        // Micro-interactions: button press states and card hover polish
        initMicroInteractions() {
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('mousedown', () => btn.classList.add('pressed'));
                btn.addEventListener('mouseup', () => btn.classList.remove('pressed'));
                btn.addEventListener('mouseleave', () => btn.classList.remove('pressed'));
            });

            const cards = document.querySelectorAll('.problem-card, .persona-card, .team-card, .market-card');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = 'var(--elev-2)';
                });
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = 'var(--shadow-light)';
                });
            });
        }
    }
}).mount('#app');

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Navigation highlighting and progress remain unchanged
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 0%; height: 3px;
        background: linear-gradient(90deg, var(--accent-orange), var(--light-blue));
        z-index: 9999; transition: width 0.1s ease;`;
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }, { passive: true });
});

// Lightweight loader (respects reduced motion)
window.addEventListener('load', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: var(--dark-blue); display: flex; justify-content: center; align-items: center;
        z-index: 10000; transition: opacity 0.5s var(--ease-out);`;
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; color: var(--accent-orange); margin-bottom: 1rem;"><i class="fas fa-book-open"></i></div>
            <div style="color: var(--text-white); font-size: 1.5rem; font-weight: 600;">Touch Learn</div>
            <div style="color: var(--text-light); margin-top: 0.5rem;">Loading...</div>
        </div>`;
    document.body.appendChild(loader);
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});
