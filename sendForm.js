document.getElementById('briefForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Собираем данные формы
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
  // Формируем человекочитаемый текст
  const briefText = `
📋 НОВЫЙ БРИФ MeManager
─────────────────────────

📌 Основная информация:
▸ Название проекта: ${data.product_name || 'Не указано'}
▸ Основные функции: ${data.main_functions || 'Не указано'}
▸ Бизнес-цели: ${data.business_goals || 'Не указано'}
▸ Целевая аудитория: ${data.target_users || 'Не указано'}
▸ Уникальные особенности: ${data.unique_features || 'Не указано'}

⚙️ Технические детали:
▸ Платформы: ${data.platforms || 'Не указано'}
▸ Управление: ${data.management || 'Не указано'}
▸ Требования: ${data.requirements || 'Не указано'}

📅 Сроки и бюджет:
▸ Дедлайн: ${data.deadline || 'Не указано'}
▸ Бюджет: ${data.budget || 'Не указано'}
▸ Ответственный: ${data.responsible || 'Не указано'}

❓ Ответы на вопросы:
1. Срок реализации проекта: ${data.q1 || 'Не указано'}
2. Приоритетные задачи: ${data.q2 || 'Не указано'}
3. Жесткие дедлайны: ${data.q3 || 'Не указано'}
4. Минимальный продукт (MVP): ${data.q4 || 'Не указано'}
5. Ограничения по ресурсам: ${data.q5 || 'Не указано'}

⏱ Дата заполнения: ${new Date().toLocaleString()}
─────────────────────────
  `.trim();
  
  // Создаем текстовый файл
  const blob = new Blob([briefText], { type: 'text/plain' });
  const formDataToSend = new FormData();
  
  // Здесь нужно указать ваш токен бота и chat_id
  const botToken = '8198513524:AAHlMMLS7VAZHWbuhBqH86XEWv29-_oktkA';
  const chatId = '-1002543940328';
  
  // Добавляем файл и описание
  formDataToSend.append('document', blob, 'megamanager_brief.txt');
  formDataToSend.append('chat_id', chatId);
  formDataToSend.append('caption', '📋 Новый заполненный бриф MeManager');
  
  // Отправляем файл через Telegram Bot API
  fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: formDataToSend
  })
  .then(response => response.json())
  .then(responseData => {
    if (responseData.ok) {
      showCustomAlert('success', 'Бриф успешно отправлен!', 'Спасибо за предоставленную информацию. Мы свяжемся с вами в ближайшее время.');
      this.reset();
    } else {
      showCustomAlert('error', 'Ошибка отправки', 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
      console.error('Telegram API Error:', responseData);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showCustomAlert('error', 'Ошибка', 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
  });
});

// Функция для показа кастомного алерта
function showCustomAlert(type, title, message) {
  const alertOverlay = document.createElement('div');
  alertOverlay.className = 'alert-overlay';
  
  const alertBox = document.createElement('div');
  alertBox.className = `alert-box ${type}`;
  
  const alertTitle = document.createElement('h3');
  alertTitle.textContent = title;
  
  const alertMessage = document.createElement('p');
  alertMessage.textContent = message;
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(alertOverlay);
  });
  
  alertBox.appendChild(alertTitle);
  alertBox.appendChild(alertMessage);
  alertBox.appendChild(closeButton);
  alertOverlay.appendChild(alertBox);
  document.body.appendChild(alertOverlay);
  
  // Автозакрытие через 5 секунд
  setTimeout(() => {
    if (document.body.contains(alertOverlay)) {
      document.body.removeChild(alertOverlay);
    }
  }, 5000);
}

// Добавляем стили в head
const style = document.createElement('style');
style.textContent = `
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

.alert-box {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideIn 0.3s;
}

.alert-box.success {
  border-top: 4px solid #4CAF50;
}

.alert-box.error {
  border-top: 4px solid #F44336;
}

.alert-box h3 {
  margin-top: 0;
  color: #333;
}

.alert-box p {
  margin-bottom: 20px;
  color: #666;
}

.alert-box button {
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.alert-box button:hover {
  background: #0b7dda;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); }
  to { transform: translateY(0); }
}
`;
document.head.appendChild(style);