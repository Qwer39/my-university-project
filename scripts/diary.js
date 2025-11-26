function openAddEntryModal() {
    document.getElementById('addEntryModal').showModal();
}

function closeAddEntryModal() {
    document.getElementById('addEntryModal').close();
}

function addNewEntry(event) {
    event.preventDefault();
    
    const date = document.getElementById('entryDate').value;
    const title = document.getElementById('entryTitle').value;
    const status = document.getElementById('entryStatus').value;
    
    // Форматирование даты
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    });
    
    // Создание новой записи
    const entriesList = document.querySelector('.entries-list');
    const newEntry = document.createElement('div');
    newEntry.className = `entry-item entry-${status === 'completed' ? 'completed' : 'in-progress'}`;
    newEntry.innerHTML = `
        <div class="entry-date">${formattedDate}</div>
        <div class="entry-content">
            <h4 class="entry-title">${title}</h4>
            <span class="entry-status">${getStatusText(status)}</span>
        </div>
    `;
    
    entriesList.insertBefore(newEntry, entriesList.firstChild);
    
    // Закрытие модалки и сброс формы
    closeAddEntryModal();
    event.target.reset();
    
    // Показать уведомление
    alert('Запись успешно добавлена!');
}

function getStatusText(status) {
    const statusMap = {
        'completed': '✓ выполнено',
        'in-progress': 'in progress',
        'planned': 'запланировано'
    };
    return statusMap[status] || status;
}

// Закрытие модалки по клику вне контента
document.getElementById('addEntryModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeAddEntryModal();
    }
});