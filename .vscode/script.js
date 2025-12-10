    // Упрощенный скрипт для темы
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Страница загружена!');
        
        // Получаем текущую тему
        let currentTheme = localStorage.getItem('theme') || 'light';
        console.log('Текущая тема:', currentTheme);
        
        // Применяем тему
        document.body.classList.add('theme--' + currentTheme);
        
        // Создаем кнопку
        createThemeButton(currentTheme);
        
        function createThemeButton(theme) {
            // Создаем кнопку
            const button = document.createElement('button');
            button.innerHTML = theme === 'light' ? '🌙' : '☀️';
            button.className = 'theme-toggle-btn';
            button.title = 'Переключить тему';
            
            // Создаем контейнер
            const container = document.createElement('div');
            container.className = 'theme-toggle';
            container.appendChild(button);
            
            // Добавляем на страницу
            document.body.appendChild(container);
            
            // Обработчик клика
            button.addEventListener('click', function() {
                toggleTheme();
            });
            
            console.log('Кнопка темы создана!');
        }
        
        function toggleTheme() {
            // Переключаем тему
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            console.log('Новая тема:', currentTheme);
            
            // Обновляем класс body
            document.body.classList.remove('theme--light', 'theme--dark');
            document.body.classList.add('theme--' + currentTheme);
            
            // Обновляем кнопку
            const button = document.querySelector('.theme-toggle-btn');
            if (button) {
                button.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
            }
            
            // Сохраняем в localStorage
            localStorage.setItem('theme', currentTheme);
        }
    });