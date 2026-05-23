// Navigation active link
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to section
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add active class based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Theme Switcher (Color Palette)
    const themes = [
        { primary: '#00f3ff', secondary: '#9d4edd', accent: '#ff00ea' }, // Cyan/Purple (Default)
        { primary: '#00ff87', secondary: '#60efff', accent: '#0061ff' }, // Green/Blue
        { primary: '#ff00ea', secondary: '#ff7300', accent: '#fadb5f' }, // Pink/Orange
        { primary: '#ff0055', secondary: '#0066ff', accent: '#00ffcc' }  // Red/Blue
    ];
    let currentThemeIndex = 0;
    
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const theme = themes[currentThemeIndex];
            
            document.documentElement.style.setProperty('--primary-neon', theme.primary);
            document.documentElement.style.setProperty('--secondary-neon', theme.secondary);
            document.documentElement.style.setProperty('--accent-neon', theme.accent);
            
            // Add a small animation to the button
            themeBtn.style.transform = 'scale(1.2) rotate(180deg)';
            setTimeout(() => {
                themeBtn.style.transform = '';
            }, 300);
        });
    }

    // Form submission
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Simple validation
            const nom = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            if (nom && email && message) {
                // Show success message
                const btn = form.querySelector('.btn');
                const originalText = btn.textContent;
                btn.textContent = '✓ Message envoyé !';
                btn.style.background = 'var(--success-color)';
                
                // Reset form
                form.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 3000);
            }
        });
    }

    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.stat-card, .project-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-card h3');
        
        statNumbers.forEach(element => {
            const target = parseInt(element.getAttribute('data-target')) || 
                          extractNumber(element.textContent);
            
            if (target) {
                animateCounter(element, target);
            }
        });
    };

    const extractNumber = (text) => {
        const match = text.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    };

    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 30;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 30);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.dashboard-stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.about-text, .about-image');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    revealElements.forEach((el, idx) => {
        el.style.opacity = '0';
        el.style.transform = idx % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });

    // Mobile menu toggle (if needed)
    const handleMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        if (window.innerWidth <= 768) {
            navbar.style.position = 'fixed';
        }
    };

    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu();

    // Scroll progress indicator
    const updateProgressBar = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        
        // You could add a progress bar element if desired
    };

    window.addEventListener('scroll', updateProgressBar);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close any popups (if added in future)
        if (e.key === 'Escape') {
            console.log('Escape key pressed');
        }
        
        // Quick scroll shortcuts
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            document.querySelector('.contact-form')?.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Light/Dark mode toggle
const addDarkModeToggle = () => {
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const isLightMode = localStorage.getItem('lightMode') === 'true';
    
    // Set initial state
    if (isLightMode) {
        document.body.classList.add('light-mode');
        if (darkModeBtn) darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            
            // Update icon
            darkModeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            
            // Add animation
            darkModeBtn.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                darkModeBtn.style.transform = '';
            }, 300);
            
            // Save preference
            localStorage.setItem('lightMode', isLight);
        });
    }
};

// Initialize dark mode on load
addDarkModeToggle();

// Track user interactions for analytics (optional)
const trackInteraction = (action, category, label) => {
    console.log(`Interaction: ${action} - ${category} - ${label}`);
    // You could send this to Google Analytics or similar
};

// Track button clicks
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => {
        const text = element.textContent.trim();
        trackInteraction('click', 'button', text);
    });
});

// ===== MEMORY GAME =====
class MemoryGame {
    constructor(cards = 8) {
        this.emojis = ['🚀', '🎮', '💻', '🔧', '🎨', '🎯', '⚡', '🌟', 
                       '💡', '🎪', '🎭', '🎸', '🏆', '🎲', '🎰', '🎪'];
        this.cards = cards;
        this.gameCards = [];
        this.flipped = [];
        this.matched = 0;
        this.moves = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.isLocked = false;
        
        this.grid = document.getElementById('memoryGrid');
        this.movesDisplay = document.getElementById('moves');
        this.matchesDisplay = document.getElementById('matches');
        this.timerDisplay = document.getElementById('timer');
        this.messageDisplay = document.getElementById('gameMessage');
        this.resetBtn = document.getElementById('resetBtn');
        this.easyBtn = document.getElementById('easyBtn');
        this.hardBtn = document.getElementById('hardBtn');
        
        this.init();
        this.attachEventListeners();
    }

    init() {
        this.shuffleCards();
        this.renderGrid();
        this.startTime = Date.now();
        this.startTimer();
    }

    shuffleCards() {
        const emojiPairs = this.emojis.slice(0, this.cards / 2);
        this.gameCards = [...emojiPairs, ...emojiPairs];
        
        // Fisher-Yates shuffle
        for (let i = this.gameCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.gameCards[i], this.gameCards[j]] = [this.gameCards[j], this.gameCards[i]];
        }
    }

    renderGrid() {
        this.grid.innerHTML = '';
        this.gameCards.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">❓</div>
                    <div class="card-back">${emoji}</div>
                </div>
            `;
            card.addEventListener('click', () => this.flipCard(card, index));
            this.grid.appendChild(card);
        });
    }

    flipCard(card, index) {
        if (this.isLocked || this.flipped.length >= 2 || this.gameCards[index] === null) {
            return;
        }

        if (card.classList.contains('flipped')) {
            return;
        }

        card.classList.add('flipped');
        this.flipped.push({ card, index });

        if (this.flipped.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isLocked = true;
        this.moves++;
        this.movesDisplay.textContent = this.moves;

        const [first, second] = this.flipped;

        if (this.gameCards[first.index] === this.gameCards[second.index]) {
            // Match found
            this.matched++;
            this.matchesDisplay.textContent = this.matched;
            this.messageDisplay.textContent = '✨ Paire trouvée !';
            this.messageDisplay.className = 'game-message success';
            
            first.card.classList.add('matched');
            second.card.classList.add('matched');

            this.flipped = [];
            this.isLocked = false;

            if (this.matched === this.cards / 2) {
                this.gameWon();
            }
        } else {
            // No match
            this.messageDisplay.textContent = '❌ Pas de correspondance !';
            this.messageDisplay.className = 'game-message error';

            setTimeout(() => {
                first.card.classList.remove('flipped');
                second.card.classList.remove('flipped');
                this.flipped = [];
                this.isLocked = false;
                this.messageDisplay.textContent = '';
                this.messageDisplay.className = 'game-message';
            }, 1000);
        }
    }

    gameWon() {
        clearInterval(this.timerInterval);
        const timeTaken = Math.floor((Date.now() - this.startTime) / 1000);
        this.messageDisplay.innerHTML = `
            🎉 <strong>Félicitations !</strong><br>
            Vous avez complété le jeu en ${this.moves} mouvements et ${timeTaken}s !
        `;
        this.messageDisplay.className = 'game-message success';
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            this.timerDisplay.textContent = elapsed + 's';
        }, 1000);
    }

    reset(newCardCount = this.cards) {
        clearInterval(this.timerInterval);
        this.cards = newCardCount;
        this.gameCards = [];
        this.flipped = [];
        this.matched = 0;
        this.moves = 0;
        this.isLocked = false;
        this.movesDisplay.textContent = '0';
        this.matchesDisplay.textContent = '0';
        this.timerDisplay.textContent = '0s';
        this.messageDisplay.textContent = '';
        this.messageDisplay.className = 'game-message';
        this.init();
    }

    attachEventListeners() {
        this.resetBtn.addEventListener('click', () => this.reset(this.cards));
        this.easyBtn.addEventListener('click', () => this.reset(8));
        this.hardBtn.addEventListener('click', () => this.reset(16));
    }
}

// Initialize memory game when DOM is loaded
let memoryGame = new MemoryGame(8);

// Export functions for global usage if needed
window.portfolioApp = {
    trackInteraction,
    addDarkModeToggle,
    memoryGame
};
