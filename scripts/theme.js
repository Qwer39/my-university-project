// scripts/theme.js
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        this.themeToggle?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Watch system preference
        this.watchSystemPreference();
        
        // Add reduced motion support
        this.handleReducedMotion();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update button text and ARIA label
        if (this.themeToggle) {
            const isDark = theme === 'dark';
            this.themeToggle.textContent = isDark ? '☀️' : '🌙';
            this.themeToggle.setAttribute('aria-label', 
                isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'
            );
            this.themeToggle.setAttribute('aria-pressed', isDark);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        
        // Animate toggle with respect to reduced motion
        if (!this.shouldReduceMotion()) {
            this.animateToggle();
        }
    }

    animateToggle() {
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    watchSystemPreference() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Apply system theme if no saved preference
        if (!localStorage.getItem('theme')) {
            this.applyTheme(mediaQuery.matches ? 'dark' : 'light');
        }

        // Listen for system theme changes
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    shouldReduceMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    handleReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const updateMotionPreference = (e) => {
            if (e.matches) {
                document.documentElement.style.setProperty('--transition', 'none');
            } else {
                document.documentElement.style.setProperty('--transition', 'all 0.3s ease');
            }
        };

        // Set initial state
        updateMotionPreference(mediaQuery);
        
        // Listen for changes
        mediaQuery.addEventListener('change', updateMotionPreference);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    
    // Focus management for skip link
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            setTimeout(() => mainContent.removeAttribute('tabindex'), 1000);
        });
    }
});