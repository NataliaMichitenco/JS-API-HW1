const tableEl = document.querySelector('.table');
const btnBlock = document.querySelector('.btn-block');
let jsonData = [];

const scheduleOfClasses = {};

async function readJSON() {
  try {
    const responce = await fetch('data.json');
    if (!responce.ok) {
      throw new Error('Не удалось получить данныес data JSON');
    }

    const data = await responce.json();
    localStorage.setItem('schedule', JSON.stringify(data));
    jsonData = data;
    addScheduleHtml(data);
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

function addScheduleHtml(data) {
  for (const key1 in data) {
    for (const key in data[key1]) {
      if (key === 'name') {
        // Добавление в таблицу
        const html = `
                <tr id='${key1}'><th>${data[key1][key]}</th></tr>
                `;
        tableEl.insertAdjacentHTML('beforeend', html);
      } else if (key === 'time') {
        // Добавление в таблицу
        const html = `
                <td>${data[key1][key]}</td>
                `;
        document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', html);
      } else if (key === 'maxParticipants') {
        // Добавление в таблицу
        const html = `
                <td>${data[key1][key]}</td>
                `;
        document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', html);
      } else if (key === 'currentParticipants') {
        // Добавление в таблицу
        const html = `
                <td>${data[key1][key]}</td>
                `;
        document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', html);
      }
    }

    // Добавление кнопки
    const html = `
            <td class='btn-column'><button class='btn'>Записаться</button></td>
        `;
    document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', html);
  }

  // Событие click на кнопку
  const btn = document.querySelectorAll('.btn');
  btn.forEach((el) => {
    // Проверка на  свободные места
    const max = data[el.parentNode.parentNode.id].maxParticipants;
    const now = data[el.parentNode.parentNode.id].currentParticipants;
    if (max === now) {
      el.disabled = true;
    }
    el.addEventListener('click', singUp);
  });
}

const singUp = (e) => {
  if (e.target.innerHTML === 'Записаться') {
    e.target.parentNode.previousElementSibling.innerHTML = jsonData[
      e.target.parentNode.parentNode.id
    ].currentParticipants += 1;

    localStorage.setItem('schedule', JSON.stringify(jsonData));

    e.target.innerHTML = 'Отменить запись';
  } else {
    e.target.parentNode.previousElementSibling.innerHTML = jsonData[
      e.target.parentNode.parentNode.id
    ].currentParticipants -= 1;

    localStorage.setItem('schedule', JSON.stringify(jsonData));

    e.target.innerHTML = 'Записаться';
  }
};

if (!localStorage.getItem('schedule')) {
  readJSON();
} else {
  jsonData = JSON.parse(localStorage.getItem('schedule'));
  addScheduleHtml(jsonData);
}