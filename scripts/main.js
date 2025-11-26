// Элементы модального окна и формы
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal(); // модальный режим + затемнение
    // Фокусируемся на первом поле формы
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки по кнопке
closeBtn.addEventListener('click', () => dlg.close('cancel'));

// Закрытие модалки по клику на бэкдроп (тень)
dlg.addEventListener('click', (event) => {
    const rect = dlg.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
        dlg.close('cancel');
    }
});

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => {
        if (el.setCustomValidity) {
            el.setCustomValidity('');
            el.removeAttribute('aria-invalid');
        }
    });

    // 2) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();

        // Кастомные сообщения об ошибках
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        const phone = form.elements.phone;
        if (phone?.validity.patternMismatch) {
            phone.setCustomValidity('Введите телефон в формате: +7 (900) 000-00-00');
        }

        const name = form.elements.name;
        if (name?.validity.tooShort) {
            name.setCustomValidity('Имя должно содержать минимум 2 символа');
        }

        form.reportValidity(); // показать браузерные подсказки

        // Подсветка проблемных полей для доступности
        [...form.elements].forEach(el => {
            if (el.willValidate && !el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
            }
        });
        return;
    }

    // 3) Успешная «отправка» (без сервера)
    e.preventDefault();
    alert('Форма успешно отправлена! Спасибо за обращение.');
    dlg.close('success');
    form.reset();
    
    // Сброс ARIA атрибутов после успешной отправки
    [...form.elements].forEach(el => {
        el.removeAttribute('aria-invalid');
    });
});

// После закрытия модалки возвращаем фокус
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Маска для телефона (дополнительное задание)
const phone = document.getElementById('phone');
phone?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Убираем начальные 7 или 8
    if (value.startsWith('7') || value.startsWith('8')) {
        value = value.substring(1);
    }
    
    // Ограничиваем 10 цифрами
    value = value.substring(0, 10);
    
    let formattedValue = '+7 (';
    if (value.length > 0) {
        formattedValue += value.substring(0, 3);
    }
    if (value.length >= 4) {
        formattedValue += ') ' + value.substring(3, 6);
    }
    if (value.length >= 7) {
        formattedValue += '-' + value.substring(6, 8);
    }
    if (value.length >= 9) {
        formattedValue += '-' + value.substring(8, 10);
    }
    
    e.target.value = formattedValue;
});

// Валидация в реальном времени для лучшего UX
form?.addEventListener('input', (e) => {
    const el = e.target;
    if (el.willValidate) {
        if (el.checkValidity()) {
            el.removeAttribute('aria-invalid');
        } else {
            el.setAttribute('aria-invalid', 'true');
        }
    }
});

// Обработка клавиши Escape для модалки
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dlg.open) {
        dlg.close('cancel');
    }
});