// Aggiunge un nuovo task dinamicamente
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', () => {
    const taskIndex = taskList.children.length;
    const newTask = document.createElement('div');
    newTask.classList.add('flex', 'items-center', 'space-x-2', 'mb-2');
    newTask.innerHTML = `
        <input type="checkbox" name="tasks[${taskIndex}][completed]" value="true" class="checkbox checkbox-sm" />
        <input type="text" name="tasks[${taskIndex}][description]" placeholder="Task description"
        class="input input-bordered flex-grow" required />
        <button type="button" class="btn btn-error btn-xs remove-task">X</button>
    `;
    taskList.appendChild(newTask);

    // Aggiunge l'event listener per rimuovere il task
    newTask.querySelector('.remove-task').addEventListener('click', () => {
        newTask.remove();
    });
});

// Event listener per i pulsanti di rimozione dei task già presenti
document.querySelectorAll('.remove-task').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.closest('.flex').remove();
    });
});