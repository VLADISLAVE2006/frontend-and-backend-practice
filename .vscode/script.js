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

// Вспомогательные функции для страницы контактов
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Текст скопирован: ' + text);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

function showOnMap() {
    alert('Открываем карту с адресом: г. Москва, ул. Пушкина, д. Колотушкина');
}

function callNumber(phone) {
    if (confirm(`Позвонить по номеру ${phone}?`)) {
        window.open(`tel:${phone}`);
    }
}

function openSocial(network) {
    const urls = {
        vk: 'https://vk.com',
        tg: 'https://telegram.org',
        wa: 'https://web.whatsapp.com'
    };
    
    if (urls[network]) {
        window.open(urls[network], '_blank');
    }
}

// Функция для обработки формы обратной связи
function handleFeedbackForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Данные формы:', data);
    
    alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
    document.getElementById('contactModal').close();
    event.target.reset();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация менеджера тем
    new ThemeManager();

    // Инициализация формы обратной связи
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackForm);
    }

    // Инициализация модального окна
    const contactModal = document.getElementById('contactModal');
    const contactButton = document.querySelector('.contacts__button');
    
    if (contactButton && contactModal) {
        contactButton.addEventListener('click', function() {
            contactModal.showModal();
        });
    }

    // Закрытие модального окна при клике вне его
    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === contactModal) {
                contactModal.close();
            }
        });
    }

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
    const cards = document.querySelectorAll('.card, .news-item, .contact-card');
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