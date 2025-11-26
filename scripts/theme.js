// Переключатель темы
class ThemeToggle {
  constructor() {
    this.KEY = 'theme';
    this.toggleBtn = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem(this.KEY);

    // Автовыбор темы
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.enableDarkTheme();
    }

    // Обработчик клика
    this.toggleBtn?.addEventListener('click', () => {
      this.toggle();
    });

    // Слушатель системных изменений
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.KEY)) {
        if (e.matches) {
          this.enableDarkTheme();
        } else {
          this.disableDarkTheme();
        }
      }
    });
  }

  enableDarkTheme() {
    document.body.classList.add('theme-dark');
    this.toggleBtn?.setAttribute('aria-pressed', 'true');
    this.toggleBtn?.setAttribute('aria-label', 'Переключить на светлую тему');
    localStorage.setItem(this.KEY, 'dark');
  }

  disableDarkTheme() {
    document.body.classList.remove('theme-dark');
    this.toggleBtn?.setAttribute('aria-pressed', 'false');
    this.toggleBtn?.setAttribute('aria-label', 'Переключить на тёмную тему');
    localStorage.setItem(this.KEY, 'light');
  }

  toggle() {
    const isDark = document.body.classList.contains('theme-dark');
    
    if (isDark) {
      this.disableDarkTheme();
    } else {
      this.enableDarkTheme();
    }

    // Анимация переключения
    this.animateToggle();
  }

  animateToggle() {
    this.toggleBtn?.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.toggleBtn?.style.transform = 'scale(1)';
    }, 150);
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  new ThemeToggle();
});