// script.js
// Функционал переключения светлой/тёмной темы

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    applyTheme(theme) {
        document.body.classList.remove('theme--light', 'theme--dark');
        document.body.classList.add(`theme--${theme}`);
        
        // Обновляем иконку кнопки
        const themeButton = document.querySelector('.theme-toggle-btn');
        if (themeButton) {
            themeButton.textContent = theme === 'light' ? '🌙' : '☀️';
        }

        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        const themeButton = document.querySelector('.theme-toggle-btn');
        if (themeButton) {
            themeButton.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация менеджера тем
    new ThemeManager();

    // Добавляем анимации для карточек при скролле
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

    // Наблюдаем за карточками
    const cards = document.querySelectorAll('.experience-card, .project-card, .news-card, .product-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    console.log('Сайт инициализирован успешно! Текущая тема:', localStorage.getItem('theme') || 'light');
});

// Добавляем поддержку клавиатуры для переключения темы
document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 't') {
        const themeManager = new ThemeManager();
        themeManager.toggleTheme();
    }
});
