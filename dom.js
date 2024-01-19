document.addEventListener('DOMContentLoaded', function () {
  const inputPlaceholder = document.querySelector('.place-holder');
  const ticker = document.querySelector('.ticker');
  const ul = document.querySelector('.course-container ul');
  const xFactors = document.querySelectorAll('.x-factor');
  const itemsLeft = document.getElementById('itemsLeft');

  // Task storage array
  let tasks = [];

  // Update placeholder text
  inputPlaceholder.addEventListener('input', function () {
    if (inputPlaceholder.value.trim() !== '') {
      inputPlaceholder.placeholder = 'Currently Typing';
    } else {
      inputPlaceholder.placeholder = 'Create a new todo..';
    }
  });

  // Add new task with ticker
  ticker.addEventListener('click', function () {
    const taskText = inputPlaceholder.value.trim();
    if (taskText !== '') {
      const newTask = document.createElement('li');
      newTask.innerHTML = `<div class="lists">
                              <div class="ticker">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                              </div>
                              <div>
                                <li>${taskText}</li>
                              </div>
                              <div class="x-factor">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                              </div>
                            </div>`;
      ul.appendChild(newTask);
      tasks.push(taskText);
      updateItemsLeft();
      inputPlaceholder.value = '';
      inputPlaceholder.placeholder = 'Create a new todo..';
      saveTasksToLocalStorage();
    }
  });

  // Cross through a task and update Items Left count
  xFactors.forEach((xFactor, index) => {
    xFactor.addEventListener('click', function () {
      const taskElement = ul.children[index];
      taskElement.classList.toggle('completed');
      updateItemsLeft();
      saveTasksToLocalStorage();
    });
  });

  // Update Items Left count
  function updateItemsLeft() {
    const incompleteTasks = document.querySelectorAll('.course-container ul li:not(.completed)').length;
    itemsLeft.textContent = `${incompleteTasks} items left`;
  }

  // Update .course-container height
  const courseContainer = document.querySelector('.course-container');
  courseContainer.style.height = '42vh';

  // Load tasks from local storage on page load
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
      tasks.forEach((task) => {
        const newTask = document.createElement('li');
        newTask.innerHTML = `<div class="lists">
                                <div class="ticker">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                                </div>
                                <div>
                                  <li>${task}</li>
                                </div>
                                <div class="x-factor">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                                </div>
                              </div>`;
        ul.appendChild(newTask);
      });
      updateItemsLeft();
    }
  }

  // Save tasks to local storage
  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage();
});
