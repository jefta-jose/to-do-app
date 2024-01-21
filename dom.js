document.addEventListener('DOMContentLoaded', function () {
  // Get elements from the HTML document
  const inputDetails = document.getElementById('input-details'); // Input field for new tasks
  const svgHolder = document.querySelector('.svg-holder'); // SVG holder for the "Add" button
  const taskList = document.querySelector('.add-list ul'); // Task list container
  const itemsLeft = document.getElementById('Items-left'); // Counter for remaining tasks
  const clearCompleted = document.getElementById('Clear'); // Button to clear completed tasks

  // Function to add a new task to the list
  function addTask(taskText) {
    // Create a new task item with SVG icons and task text
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <div class="task">
        <div class="add-factor">
          <div class="svg-holder1">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
          <div>${taskText}</div>
        </div>
        <div class="x-factor">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </div>
      </div>
    `;
    // Add the new task to the task list
    taskList.appendChild(taskItem);
    // Update the count of remaining tasks
    updateItemsLeft();
  }

  // Event listener for adding a task when the "Add" button is clicked
  svgHolder.addEventListener('click', function () {
    // Get the task text from the input field
    const taskText = inputDetails.value.trim();
    // Check if the task text is not empty
    if (taskText !== '') {
      // Add the new task to the list and clear the input field
      addTask(taskText);
      inputDetails.value = '';
    }
  });

  // Event listener for marking a task as completed or deleting it
  taskList.addEventListener('click', function (event) {
    // Find the closest task item that was clicked
    const taskItem = event.target.closest('.task');

    if (taskItem) {
      const xFactor = taskItem.querySelector('.x-factor');

      // Check if the click was on the X-factor for deletion
      if (xFactor.contains(event.target)) {
        // Completely delete the task and update the count
        taskItem.remove();
        updateItemsLeft();
      } else {
        // Toggle completed state and strike through the task, then update the count
        taskItem.classList.toggle('completed');
        const svgHolder = taskItem.querySelector('.svg-holder');
        if (svgHolder) {
          svgHolder.style.textDecoration = 'line-through';
        }
        updateItemsLeft();
      }
    }
  });

  // Attach the function to update remaining tasks to the X-factor
  const xFactorSvgs = document.querySelectorAll(".x-factor svg");
  xFactorSvgs.forEach(svg => {
    svg.addEventListener("click", updateItemsLeft);
  });

  // Function to update the count of remaining tasks
  function updateItemsLeft() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.completed').length;
    const remainingTasks = totalTasks - completedTasks;
    itemsLeft.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'item' : 'items'} left`;
  }

  // Call the function initially to set the initial count
  updateItemsLeft();

  // Event listener for clearing completed tasks
  clearCompleted.addEventListener('click', function () {
    // Find completed tasks and remove them, then update the count
    const completedTasks = taskList.querySelectorAll('.completed');
    completedTasks.forEach(task => task.remove());
    updateItemsLeft();
  });
});
