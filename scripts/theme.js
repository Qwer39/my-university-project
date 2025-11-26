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
        
        // Слушаем системные предпочтения
        this.watchSystemPreference();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Обновляем текст кнопки
        if (this.themeToggle) {
            this.themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            this.themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'
            );
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.currentTheme = newTheme;
        this.applyTheme(newTheme);
        
        // Анимация переключения
        this.animateToggle();
    }

    animateToggle() {
        this.themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }

    watchSystemPreference() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Применяем системную тему если нет сохраненной
        if (!localStorage.getItem('theme')) {
            this.applyTheme(mediaQuery.matches ? 'dark' : 'light');
        }

        // Слушаем изменения системной темы
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});