// =============================================================================
// Simple To-Do List - Vanilla JavaScript
// =============================================================================

// Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('empty-state');

// State
let todos = JSON.parse(localStorage.getItem('simple_todos')) || [];
let currentFilter = 'all';

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem('simple_todos', JSON.stringify(todos));
}

// Render Todos
function render() {
  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Clear list
  todoList.innerHTML = '';

  // Render items
  filteredTodos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-item-left">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''} 
          aria-label="Mark task as complete"
        />
        <span class="todo-text">${escapeHtml(todo.text)}</span>
      </div>
      <button type="button" class="delete-btn" aria-label="Delete task">&times;</button>
    `;

    todoList.appendChild(li);
  });

  // Empty state display
  if (filteredTodos.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // Update items left count
  const activeCount = todos.filter((t) => !t.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;

  // Toggle "Clear completed" visibility
  const hasCompleted = todos.some((t) => t.completed);
  clearCompletedBtn.style.visibility = hasCompleted ? 'visible' : 'hidden';
}

// Add New Todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now().toString(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  render();

  todoInput.value = '';
  todoInput.focus();
});

// Toggle Complete or Delete using Event Delegation
todoList.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item');
  if (!item) return;
  const id = item.dataset.id;

  // Toggle completion
  if (e.target.classList.contains('todo-checkbox')) {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: e.target.checked };
      }
      return todo;
    });
    saveTodos();
    render();
  }

  // Delete todo
  if (e.target.classList.contains('delete-btn')) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
  }
});

// Filters
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Clear Completed
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
});

// Helper: Escape HTML to avoid XSS
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Initial Render
render();
