const projectsData = {
    1: {
        title: "Личный сайт",
        description: "Адаптивный сайт-портфолио с современным дизайном и анимациями.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid"],
        features: ["Адаптивный дизайн", "Тёмная тема", "Анимации CSS", "Формы обратной связи"],
        demoLink: "#",
        codeLink: "#",
        images: ["../images/project1.jpg"]
    },
    2: {
        title: "Todo-приложение",
        description: "Приложение для управления задачами с локальным сохранением данных.",
        technologies: ["JavaScript", "LocalStorage", "CSS3", "HTML5"],
        features: ["Добавление/удаление задач", "Отметка выполненных", "Фильтрация", "Поиск"],
        demoLink: "#",
        codeLink: "#",
        images: ["../images/project2.jpg"]
    },
    3: {
        title: "Интернет-магазин",
        description: "Прототип интернет-магазина с корзиной товаров и фильтрацией.",
        technologies: ["React", "JavaScript", "CSS Modules", "API"],
        features: ["Каталог товаров", "Корзина", "Фильтрация", "Поиск", "Адаптивность"],
        demoLink: "#",
        codeLink: "#",
        images: ["../images/project3.jpg"]
    },
    4: {
        title: "Портфолио Bootstrap",
        description: "Адаптивное портфолио с использованием Bootstrap 5 и современных практик.",
        technologies: ["Bootstrap 5", "JavaScript", "SASS", "Responsive Design"],
        features: ["Bootstrap компоненты", "Адаптивная сетка", "Модальные окна", "Навигация"],
        demoLink: "#",
        codeLink: "#",
        images: ["../images/project4.jpg"]
    }
};

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3 class="modal-title">${project.title}</h3>
        <div class="project-details">
            <p class="project-description">${project.description}</p>
            
            <div class="project-tech-stack">
                <h4>Технологии:</h4>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-features">
                <h4>Функциональность:</h4>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-links">
                <a href="${project.demoLink}" class="button button--primary" target="_blank">Демо</a>
                <a href="${project.codeLink}" class="button button--secondary" target="_blank">Исходный код</a>
            </div>
        </div>
    `;
    
    modal.showModal();
}

function closeProjectModal() {
    document.getElementById('projectModal').close();
}

// Закрытие модалки по клику вне контента
document.getElementById('projectModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeProjectModal();
    }
});