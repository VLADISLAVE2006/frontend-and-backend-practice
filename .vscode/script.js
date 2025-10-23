// script.js - Упрощенная рабочая версия

// Менеджер темы
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle__button');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
    }

    applyTheme(theme) {
        document.body.className = `theme--${theme}`;
        const icon = this.themeToggle?.querySelector('.theme-toggle__icon');
        if (icon) {
            icon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }
}

// Менеджер карточек
class CardManager {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }

    init() {
        this.bindCardEvents();
    }

    bindCardEvents() {
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.card__button')) {
                    this.toggleCardSelection(card);
                }
            });
        });
    }

    toggleCardSelection(card) {
        const isSelected = card.classList.contains('card--selected');
        
        if (isSelected) {
            card.classList.remove('card--selected');
        } else {
            card.classList.add('card--selected');
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new CardManager();

    // Инициализация модального окна если есть на странице
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        initModal(contactModal);
    }
});

// Функции для модального окна контактов
function initModal(modal) {
    // Закрытие по клику на фон
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            this.close();
        }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.open) {
            modal.close();
        }
    });
}

// Функции для страницы контактов
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Текст скопирован в буфер обмена: ' + text);
    });
}

function showOnMap() {
    alert('Функция показа на карте будет реализована позже');
}

function callNumber(number) {
    alert('Имитация звонка на номер: ' + number);
}

function openSocial(network) {
    const networks = {
        vk: 'https://vk.com',
        tg: 'https://telegram.org',
        wa: 'https://web.whatsapp.com'
    };
    window.open(networks[network], '_blank');
}

// Обработка формы обратной связи
if (document.getElementById('feedbackForm')) {
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        console.log('Данные формы:', data);
        alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
        
        const modal = document.getElementById('contactModal');
        if (modal) modal.close();
        
        this.reset();
    });
}