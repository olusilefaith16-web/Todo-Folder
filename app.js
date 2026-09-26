/**
 * TaskFlow - Vanilla JavaScript Application Logic
 * High-performance, modular, and reactive task management.
 */

// =============================================================================
// 1. Initial State & Configuration
// =============================================================================
const STORAGE_KEY = 'taskflow_todos_v1';
const THEME_KEY = 'taskflow_theme';
const SOUND_KEY = 'taskflow_sound';

const DEFAULT_SAMPLE_TASKS = [
  {
    id: 'sample-1',
    title: 'Design high-converting landing page',
    completed: false,
    priority: 'high',
    category: 'Design',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    notes: 'Create wireframes in Figma and check typography hierarchy.',
    starred: true,
    createdAt: Date.now() - 3600000 * 2
  },
  {
    id: 'sample-2',
    title: 'Review quarterly budget and cloud expenses',
    completed: false,
    priority: 'medium',
    category: 'Finance',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    notes: 'Audit server instances and recurring SaaS subscriptions.',
    starred: false,
    createdAt: Date.now() - 3600000 * 5
  },
  {
    id: 'sample-3',
    title: 'Complete 45-minute HIIT workout',
    completed: true,
    priority: 'low',
    category: 'Health',
    dueDate: new Date().toISOString().split('T')[0],
    notes: 'Cardio intervals and post-workout stretch.',
    starred: false,
    createdAt: Date.now() - 3600000 * 12
  },
  {
    id: 'sample-4',
    title: 'Read 2 chapters of Designing Data-Intensive Applications',
    completed: false,
    priority: 'medium',
    category: 'Study',
    dueDate: '',
    notes: 'Focus on consensus algorithms and distributed state.',
    starred: false,
    createdAt: Date.now() - 3600000 * 20
  }
];

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch {
      // Audio policy fallback
    }
  }

  playDelete() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio policy fallback
    }
  }
}

class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x = window.innerWidth / 2, y = window.innerHeight / 2.5) {
    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#ffffff'];
    const count = 75;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 4 + Math.random() * 8;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 5 + Math.random() * 6,
        alpha: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.22,
        drag: 0.96
      });
    }

    if (!this.animationId) {
      this.loop();
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.014;

      if (p.alpha <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// =============================================================================
// 2. Main Application Class
// =============================================================================
class TaskFlowApp {
  constructor() {
    this.tasks = [];
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.currentSort = 'created-desc';
    this.searchQuery = '';
    this.lastDeletedTask = null;
    this.undoTimeout = null;

    // Components
    this.sound = new SoundSynthesizer();
    this.confetti = new ConfettiEngine(document.getElementById('confetti-canvas'));
    this.soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';

    this.cacheDOM();
    this.initTheme();
    this.initSoundToggle();
    this.bindEvents();
    this.loadTasks();
    this.renderDate();
    this.render();
  }

  cacheDOM() {
    // Header & Controls
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.sunIcon = document.getElementById('sun-icon');
    this.moonIcon = document.getElementById('moon-icon');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.soundIconOn = document.getElementById('sound-icon-on');
    this.soundIconOff = document.getElementById('sound-icon-off');
    this.dateText = document.getElementById('date-text');

    // Stats
    this.progressCircle = document.getElementById('progress-circle');
    this.progressPercentage = document.getElementById('progress-percentage');
    this.statHeadline = document.getElementById('stat-headline');
    this.statSubtext = document.getElementById('stat-subtext');
    this.completedCount = document.getElementById('completed-count');
    this.totalCount = document.getElementById('total-count');
    this.progressPill = document.getElementById('progress-pill');
    this.countAll = document.getElementById('count-all');
    this.countPending = document.getElementById('count-pending');
    this.countCompleted = document.getElementById('count-completed');
    this.countStarred = document.getElementById('count-starred');

    // Form
    this.taskForm = document.getElementById('task-form');
    this.titleInput = document.getElementById('task-title-input');
    this.categorySelect = document.getElementById('task-category-select');
    this.prioritySelect = document.getElementById('task-priority-select');
    this.dueDateInput = document.getElementById('task-due-date-input');
    this.notesInput = document.getElementById('task-notes-input');
    this.toggleOptionsBtn = document.getElementById('toggle-options-btn');
    this.formExtendedOptions = document.getElementById('form-extended-options');

    // Filters & Sorting
    this.searchInput = document.getElementById('search-input');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.statusTabs = document.getElementById('status-tabs');
    this.categoryFilterSelect = document.getElementById('category-filter-select');
    this.sortSelect = document.getElementById('sort-select');
    this.itemsCountIndicator = document.getElementById('items-count-indicator');

    // Utilities
    this.clearCompletedBtn = document.getElementById('clear-completed-btn');
    this.loadSampleBtn = document.getElementById('load-sample-btn');
    this.exportBtn = document.getElementById('export-btn');
    this.importInput = document.getElementById('import-input');

    // Lists & States
    this.taskList = document.getElementById('task-list');
    this.emptyState = document.getElementById('empty-state');
    this.emptyAddSampleBtn = document.getElementById('empty-add-sample-btn');

    // Edit Modal
    this.editModal = document.getElementById('edit-modal');
    this.editForm = document.getElementById('edit-form');
    this.editTaskId = document.getElementById('edit-task-id');
    this.editTitle = document.getElementById('edit-title');
    this.editCategory = document.getElementById('edit-category');
    this.editPriority = document.getElementById('edit-priority');
    this.editDueDate = document.getElementById('edit-due-date');
    this.editNotes = document.getElementById('edit-notes');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.cancelEditBtn = document.getElementById('cancel-edit-btn');

    // Toast
    this.toastContainer = document.getElementById('toast-container');
  }

  // ===========================================================================
  // Theme & Audio Controls
  // ===========================================================================
  initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcons(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    this.updateThemeIcons(newTheme);
    this.showToast(`Switched to ${newTheme} theme`);
  }

  updateThemeIcons(theme) {
    if (theme === 'light') {
      this.sunIcon.classList.add('hidden');
      this.moonIcon.classList.remove('hidden');
    } else {
      this.sunIcon.classList.remove('hidden');
      this.moonIcon.classList.add('hidden');
    }
  }

  initSoundToggle() {
    this.updateSoundIcons();
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem(SOUND_KEY, this.soundEnabled);
    this.updateSoundIcons();
    if (this.soundEnabled) {
      this.sound.playPop();
      this.showToast('Audio feedback enabled');
    } else {
      this.showToast('Audio feedback muted');
    }
  }

  updateSoundIcons() {
    if (this.soundEnabled) {
      this.soundIconOn.classList.remove('hidden');
      this.soundIconOff.classList.add('hidden');
    } else {
      this.soundIconOn.classList.add('hidden');
      this.soundIconOff.classList.remove('hidden');
    }
  }

  // ===========================================================================
  // Event Bindings
  // ===========================================================================
  bindEvents() {
    // Theme & Sound
    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    this.soundToggleBtn.addEventListener('click', () => this.toggleSound());

    // Toggle options drawer
    this.toggleOptionsBtn.addEventListener('click', () => {
      const isOpen = this.formExtendedOptions.classList.toggle('open');
      this.toggleOptionsBtn.setAttribute('aria-expanded', isOpen);
      this.toggleOptionsBtn.classList.toggle('active', isOpen);
    });

    // Form submission
    this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));

    // Search bar
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.clearSearchBtn.classList.toggle('hidden', this.searchQuery.length === 0);
      this.render();
    });

    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.clearSearchBtn.classList.add('hidden');
      this.searchInput.focus();
      this.render();
    });

    // Status filter tabs
    this.statusTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.status-tab');
      if (!tab) return;
      this.statusTabs.querySelectorAll('.status-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      this.currentFilter = tab.dataset.status;
      this.render();
    });

    // Stats counter quick-clicks
    document.querySelectorAll('.counter-card').forEach((card) => {
      card.addEventListener('click', () => {
        const filter = card.dataset.filter;
        if (!filter) return;
        const targetTab = this.statusTabs.querySelector(`[data-status="${filter}"]`);
        if (targetTab) {
          targetTab.click();
        }
      });
    });

    // Category filter & Sort select
    this.categoryFilterSelect.addEventListener('change', (e) => {
      this.currentCategory = e.target.value;
      this.render();
    });

    this.sortSelect.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.render();
    });

    // Clear completed
    this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());

    // Sample data
    this.loadSampleBtn.addEventListener('click', () => this.loadSampleData());
    this.emptyAddSampleBtn.addEventListener('click', () => this.loadSampleData());

    // Export / Import
    this.exportBtn.addEventListener('click', () => this.exportTasks());
    this.importInput.addEventListener('change', (e) => this.importTasks(e));

    // Task list clicks (delegation)
    this.taskList.addEventListener('click', (e) => this.handleTaskListClick(e));

    // Edit modal
    this.closeModalBtn.addEventListener('click', () => this.closeEditModal());
    this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
    this.editModal.addEventListener('click', (e) => {
      if (e.target === this.editModal) this.closeEditModal();
    });
    this.editForm.addEventListener('submit', (e) => this.handleSaveEdit(e));

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!this.editModal.classList.contains('hidden')) {
          this.closeEditModal();
        }
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        this.searchInput.focus();
      }
    });
  }

  // ===========================================================================
  // Storage & Sample Data
  // ===========================================================================
  loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.tasks = JSON.parse(stored);
      } else {
        this.tasks = [...DEFAULT_SAMPLE_TASKS];
        this.saveTasks();
      }
    } catch {
      this.tasks = [...DEFAULT_SAMPLE_TASKS];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch {
      this.showToast('Error saving to local storage', true);
    }
  }

  loadSampleData() {
    this.tasks = JSON.parse(JSON.stringify(DEFAULT_SAMPLE_TASKS));
    this.saveTasks();
    if (this.soundEnabled) this.sound.playPop();
    this.showToast('Sample tasks loaded');
    this.render();
  }

  exportTasks() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `TaskFlow_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Exported tasks to JSON file');
  }

  importTasks(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          this.tasks = imported;
          this.saveTasks();
          this.render();
          this.showToast(`Imported ${imported.length} tasks successfully`);
        } else {
          this.showToast('Invalid file structure', true);
        }
      } catch {
        this.showToast('Failed to parse JSON file', true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ===========================================================================
  // Core Operations
  // ===========================================================================
  handleAddTask(e) {
    e.preventDefault();
    const title = this.titleInput.value.trim();
    if (!title) return;

    const newTask = {
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: title,
      completed: false,
      priority: this.prioritySelect.value || 'medium',
      category: this.categorySelect.value || 'Personal',
      dueDate: this.dueDateInput.value || '',
      notes: this.notesInput.value.trim() || '',
      starred: false,
      createdAt: Date.now()
    };

    this.tasks.unshift(newTask);
    this.saveTasks();

    if (this.soundEnabled) this.sound.playPop();
    this.showToast('Task added successfully');

    // Reset fields
    this.titleInput.value = '';
    this.notesInput.value = '';
    this.dueDateInput.value = '';
    this.formExtendedOptions.classList.remove('open');
    this.toggleOptionsBtn.setAttribute('aria-expanded', 'false');
    this.toggleOptionsBtn.classList.remove('active');

    this.render();
    this.titleInput.focus();
  }

  handleTaskListClick(e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const taskId = taskItem.dataset.id;
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Toggle complete checkbox
    if (target.closest('.checkbox-container')) {
      const checkbox = target.closest('.checkbox-container').querySelector('input');
      this.toggleTaskCompletion(task, checkbox.checked);
      return;
    }

    // Star toggle
    if (target.closest('.star-btn')) {
      task.starred = !task.starred;
      this.saveTasks();
      if (this.soundEnabled) this.sound.playPop();
      this.render();
      return;
    }

    // Edit button
    if (target.closest('.edit-btn')) {
      this.openEditModal(task);
      return;
    }

    // Duplicate button
    if (target.closest('.duplicate-btn')) {
      this.duplicateTask(task);
      return;
    }

    // Delete button
    if (target.closest('.delete-btn')) {
      this.deleteTaskWithAnimation(taskItem, task);
      return;
    }
  }

  toggleTaskCompletion(task, isCompleted) {
    task.completed = isCompleted;
    this.saveTasks();

    if (task.completed) {
      if (this.soundEnabled) this.sound.playChime();
      this.confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4);
      this.showToast('Task completed! 🎉');
    } else {
      if (this.soundEnabled) this.sound.playPop();
    }

    this.render();
  }

  duplicateTask(task) {
    const duplicate = {
      ...task,
      id: 'task_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: `${task.title} (Copy)`,
      completed: false,
      createdAt: Date.now()
    };
    this.tasks.unshift(duplicate);
    this.saveTasks();
    if (this.soundEnabled) this.sound.playPop();
    this.showToast('Task duplicated');
    this.render();
  }

  deleteTaskWithAnimation(taskElement, task) {
    taskElement.classList.add('removing');

    if (this.soundEnabled) this.sound.playDelete();

    setTimeout(() => {
      this.lastDeletedTask = { ...task };
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
      this.saveTasks();
      this.render();

      this.showUndoToast(`Deleted "${task.title.length > 25 ? task.title.substring(0, 25) + '...' : task.title}"`);
    }, 240);
  }

  handleClearCompleted() {
    const completedTasks = this.tasks.filter((t) => t.completed);
    if (completedTasks.length === 0) {
      this.showToast('No completed tasks to clear');
      return;
    }

    const count = completedTasks.length;
    this.tasks = this.tasks.filter((t) => !t.completed);
    this.saveTasks();
    if (this.soundEnabled) this.sound.playDelete();
    this.showToast(`Cleared ${count} completed task${count > 1 ? 's' : ''}`);
    this.render();
  }

  // ===========================================================================
  // Edit Modal Flow
  // ===========================================================================
  openEditModal(task) {
    this.editTaskId.value = task.id;
    this.editTitle.value = task.title;
    this.editCategory.value = task.category || 'Personal';
    this.editPriority.value = task.priority || 'medium';
    this.editDueDate.value = task.dueDate || '';
    this.editNotes.value = task.notes || '';

    this.editModal.classList.remove('hidden');
    this.editTitle.focus();
  }

  closeEditModal() {
    this.editModal.classList.add('hidden');
  }

  handleSaveEdit(e) {
    e.preventDefault();
    const id = this.editTaskId.value;
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return;

    task.title = this.editTitle.value.trim();
    task.category = this.editCategory.value;
    task.priority = this.editPriority.value;
    task.dueDate = this.editDueDate.value;
    task.notes = this.editNotes.value.trim();

    this.saveTasks();
    this.closeEditModal();
    if (this.soundEnabled) this.sound.playPop();
    this.showToast('Task updated');
    this.render();
  }

  // ===========================================================================
  // Toast & Undo Notification System
  // ===========================================================================
  showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.borderColor = 'var(--priority-high)';

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${isError ? 'var(--priority-high)' : 'var(--primary)'}" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${this.escapeHTML(message)}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  showUndoToast(message) {
    clearTimeout(this.undoTimeout);
    this.toastContainer.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span>${this.escapeHTML(message)}</span>
      <button class="toast-undo-btn" id="toast-undo-action">Undo</button>
    `;

    this.toastContainer.appendChild(toast);

    const undoBtn = toast.querySelector('#toast-undo-action');
    undoBtn.addEventListener('click', () => {
      if (this.lastDeletedTask) {
        this.tasks.unshift(this.lastDeletedTask);
        this.lastDeletedTask = null;
        this.saveTasks();
        this.render();
        toast.remove();
        this.showToast('Task restored');
      }
    });

    this.undoTimeout = setTimeout(() => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        toast.remove();
        this.lastDeletedTask = null;
      }, 250);
    }, 4500);
  }

  // ===========================================================================
  // Rendering & Statistics
  // ===========================================================================
  renderDate() {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const today = new Date();
    this.dateText.textContent = today.toLocaleDateString('en-US', options);
  }

  getFilteredTasks() {
    return this.tasks.filter((task) => {
      // Status filter
      if (this.currentFilter === 'active' && task.completed) return false;
      if (this.currentFilter === 'completed' && !task.completed) return false;
      if (this.currentFilter === 'starred' && !task.starred) return false;

      // Category filter
      if (this.currentCategory !== 'all' && task.category !== this.currentCategory) return false;

      // Search query
      if (this.searchQuery) {
        const query = this.searchQuery;
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesCategory = (task.category || '').toLowerCase().includes(query);
        const matchesNotes = (task.notes || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesCategory && !matchesNotes) return false;
      }

      return true;
    });
  }

  getSortedTasks(tasks) {
    const priorityWeights = { high: 3, medium: 2, low: 1 };

    return [...tasks].sort((a, b) => {
      // Starred tasks always float to top unless sorting specifically
      if (a.starred !== b.starred) {
        return a.starred ? -1 : 1;
      }

      switch (this.currentSort) {
        case 'created-asc':
          return (a.createdAt || 0) - (b.createdAt || 0);
        case 'due-date':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority-desc':
          return (priorityWeights[b.priority] || 2) - (priorityWeights[a.priority] || 2);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'created-desc':
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });
  }

  updateMetrics() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const starred = this.tasks.filter((t) => t.starred).length;

    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Update numbers
    this.totalCount.textContent = total;
    this.completedCount.textContent = completed;
    this.countAll.textContent = total;
    this.countPending.textContent = pending;
    this.countCompleted.textContent = completed;
    this.countStarred.textContent = starred;

    // Progress circle (circumference is ~219.91 for r=35)
    const circumference = 2 * Math.PI * 35;
    const offset = circumference - (percentage / 100) * circumference;
    this.progressCircle.style.strokeDashoffset = offset;
    this.progressPercentage.textContent = `${percentage}%`;
    this.progressPill.style.width = `${percentage}%`;

    // Dynamic motivating messages
    if (total === 0) {
      this.statHeadline.textContent = "Your canvas is clean!";
      this.statSubtext.textContent = 'Add a new objective above to ignite your flow';
    } else if (percentage === 100) {
      this.statHeadline.textContent = 'Spectacular! All done! 🏆';
      this.statSubtext.textContent = `You finished all ${total} tasks. High five!`;
    } else if (percentage >= 75) {
      this.statHeadline.textContent = 'Almost at the finish line! 🚀';
      this.statSubtext.textContent = `${completed} of ${total} tasks accomplished`;
    } else if (percentage >= 40) {
      this.statHeadline.textContent = 'Building great momentum! ⚡';
      this.statSubtext.textContent = `${completed} of ${total} tasks accomplished`;
    } else {
      this.statHeadline.textContent = "Let's conquer your day!";
      this.statSubtext.textContent = `${completed} of ${total} tasks completed`;
    }
  }

  render() {
    this.updateMetrics();

    const filtered = this.getFilteredTasks();
    const sorted = this.getSortedTasks(filtered);

    // Update filter status counter indicator
    if (this.searchQuery) {
      this.itemsCountIndicator.textContent = `Found ${sorted.length} task${sorted.length === 1 ? '' : 's'} matching "${this.searchQuery}"`;
    } else if (this.currentFilter !== 'all' || this.currentCategory !== 'all') {
      this.itemsCountIndicator.textContent = `Showing ${sorted.length} of ${this.tasks.length} tasks`;
    } else {
      this.itemsCountIndicator.textContent = `Showing all ${this.tasks.length} tasks`;
    }

    if (sorted.length === 0) {
      this.taskList.innerHTML = '';
      this.emptyState.classList.remove('hidden');
      return;
    }

    this.emptyState.classList.add('hidden');

    const todayStr = new Date().toISOString().split('T')[0];

    const html = sorted.map((task) => {
      const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
      const formattedDate = task.dueDate ? this.formatDateBadge(task.dueDate) : '';

      return `
        <li class="task-item ${task.completed ? 'completed' : ''} priority-${task.priority}-border" data-id="${task.id}">
          <label class="checkbox-container" title="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} />
            <span class="custom-checkmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          </label>

          <div class="task-content">
            <div class="task-title-row">
              <span class="task-title">${this.escapeHTML(task.title)}</span>
            </div>

            ${task.notes ? `<p class="task-notes">${this.escapeHTML(task.notes)}</p>` : ''}

            <div class="task-meta">
              <span class="tag-badge badge-${task.category.toLowerCase()}">${this.getCategoryIcon(task.category)} ${task.category}</span>
              <span class="priority-badge ${task.priority}">${task.priority}</span>
              ${task.dueDate ? `
                <span class="due-date-badge ${isOverdue ? 'overdue' : ''}">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  ${isOverdue ? '⚠️ Overdue: ' : 'Due '}${formattedDate}
                </span>
              ` : ''}
            </div>
          </div>

          <div class="task-actions">
            <button class="task-action-btn star-btn ${task.starred ? 'starred' : ''}" title="${task.starred ? 'Unstar task' : 'Star task'}" aria-label="Star task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            <button class="task-action-btn edit-btn" title="Edit task" aria-label="Edit task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="task-action-btn duplicate-btn" title="Duplicate task" aria-label="Duplicate task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <button class="task-action-btn delete-btn" title="Delete task" aria-label="Delete task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </li>
      `;
    }).join('');

    this.taskList.innerHTML = html;
  }

  // ===========================================================================
  // Helpers
  // ===========================================================================
  formatDateBadge(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getCategoryIcon(cat) {
    switch (cat) {
      case 'Work': return '💼';
      case 'Personal': return '👤';
      case 'Design': return '🎨';
      case 'Health': return '⚡';
      case 'Finance': return '💰';
      case 'Study': return '📚';
      default: return '📌';
    }
  }

  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.taskFlowApp = new TaskFlowApp();
});
