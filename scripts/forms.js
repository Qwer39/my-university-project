// Улучшенная валидация форм
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = this.form?.querySelectorAll('[data-validate]');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Валидация в реальном времени
        this.fields?.forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });

        // Валидация при отправке
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type || field.dataset.validate;
        const errorElement = this.getErrorElement(field);

        this.clearFieldError(field);

        // Проверка на обязательность
        if (field.required && !value) {
            return this.showError(field, 'Это поле обязательно для заполнения');
        }

        if (!value) return true;

        // Специфические проверки
        switch (type) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    return this.showError(field, 'Введите корректный email адрес');
                }
                break;

            case 'tel':
                if (!this.isValidPhone(value)) {
                    return this.showError(field, 'Введите корректный номер телефона');
                }
                break;

            case 'url':
                if (!this.isValidUrl(value)) {
                    return this.showError(field, 'Введите корректный URL');
                }
                break;

            case 'text':
                if (field.minLength && value.length < field.minLength) {
                    return this.showError(field, `Минимальная длина: ${field.minLength} символов`);
                }
                if (field.maxLength && value.length > field.maxLength) {
                    return this.showError(field, `Максимальная длина: ${field.maxLength} символов`);
                }
                break;
        }

        this.showSuccess(field);
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    showError(field, message) {
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('form-error');

        const errorElement = this.getErrorElement(field);
        errorElement.textContent = message;
        errorElement.classList.add('form-error--visible');

        return false;
    }

    showSuccess(field) {
        field.setAttribute('aria-invalid', 'false');
        field.classList.remove('form-error');
        field.classList.add('form-success');

        const errorElement = this.getErrorElement(field);
        errorElement.classList.remove('form-error--visible');
    }

    clearFieldError(field) {
        field.classList.remove('form-error', 'form-success');
        
        const errorElement = this.getErrorElement(field);
        errorElement.textContent = '';
        errorElement.classList.remove('form-error--visible');
    }

    getErrorElement(field) {
        let errorElement = field.parentNode.querySelector('.form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            field.parentNode.appendChild(errorElement);
        }
        return errorElement;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Валидация всех полей
        let isValid = true;
        this.fields?.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showFirstError();
            return;
        }

        // Отправка формы
        await this.submitForm();
    }

    showFirstError() {
        const firstError = this.form.querySelector('.form-error--visible');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    async submitForm() {
        const formData = new FormData(this.form);
        
        try {
            this.setFormState('loading');
            
            // Здесь будет реальный запрос к API
            const response = await this.mockApiCall(formData);
            
            if (response.success) {
                this.setFormState('success');
                this.form.reset();
            } else {
                this.setFormState('error', response.message);
            }
        } catch (error) {
            this.setFormState('error', 'Произошла ошибка при отправке формы');
        }
    }

    setFormState(state, message = '') {
        this.form.classList.remove('form-loading', 'form-success', 'form-error');
        
        switch (state) {
            case 'loading':
                this.form.classList.add('form-loading');
                break;
            case 'success':
                this.form.classList.add('form-success');
                this.showNotification('Форма успешно отправлена!', 'success');
                break;
            case 'error':
                this.form.classList.add('form-error');
                this.showNotification(message || 'Ошибка при отправке формы', 'error');
                break;
        }
    }

    showNotification(message, type) {
        // Создание и показ уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = 'var(--color-success)';
        } else {
            notification.style.background = 'var(--color-danger)';
        }
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    async mockApiCall(formData) {
        // Имитация API запроса
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Форма успешно отправлена'
                });
            }, 2000);
        });
    }
}

// Инициализация валидации для всех форм
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        new FormValidator(form.id);
    });
});