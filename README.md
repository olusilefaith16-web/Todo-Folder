# TaskFlow &bull; Next-Gen Task & Productivity Manager

A modern, responsive, and aesthetic productivity and task management web application built from scratch using **pure HTML5, Vanilla CSS3, and Vanilla JavaScript** — strictly without Tailwind CSS or any external frontend frameworks.

---

## 🌟 Key Features

- **Rich Visual Aesthetics**:
  - Glassmorphic card surfaces with ambient radial light gradients.
  - Dark Mode (default) and Light Mode with seamless theme persistence.
  - Micro-interactions, animated hover states, and smooth slide animations for task creation and deletion.
  - Zero-dependency canvas confetti explosion upon task completion.

- **Audio Feedback**:
  - Integrated Web Audio API synthesizer for satisfying audio clicks, completion chimes, and deletions (can be toggled on/off).

- **Productivity & Analytics Dashboard**:
  - Dynamic SVG circular progress ring and progress bar reflecting real-time task completion percentage.
  - Contextual motivational quotes and stats breakdown (Total, Pending, Completed, Starred).

- **Task Management**:
  - **Quick Add**: Type task title and press <kbd>Enter</kbd>.
  - **Detailed Task Attributes**: Priority levels (High, Medium, Low), Categories (Work, Personal, Design, Health, Finance, Study), Due Dates (with overdue indicator), and optional Notes.
  - **Star / Pin**: Highlight important tasks to keep them top-of-mind.
  - **Edit & Duplicate**: In-place modal editor and one-click task duplication.
  - **Undo Deletion**: Interactive toast notification allowing you to undo accidental deletions.

- **Organization & Sorting**:
  - Real-time search with instant filtering.
  - Filter tabs: *All*, *Active*, *Completed*, *⭐ Starred*.
  - Category dropdown filter.
  - Sorting options: *Newest First*, *Oldest First*, *Due Date*, *Highest Priority*, *Alphabetical*.

- **Persistence & Portability**:
  - Automatic `localStorage` synchronization.
  - JSON Export and Import for backups and data transfer.
  - Sample data loader for quick testing.

---

## 🚀 Running the App

### Option 1: Open Directly in Any Browser
Simply double-click [`index.html`](index.html) or open it directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Run via Local Server
A lightweight Node.js static server is included:
```bash
node server.js
```
Then visit:
```
http://localhost:8080/
```

---

## 📁 File Structure

```
Todo Folder/
├── index.html       # Semantic HTML5 layout & accessible markup
├── styles.css       # Vanilla CSS3 design system, theme tokens, and animations
├── app.js           # Vanilla JavaScript state management, audio synth, and UI logic
├── server.js        # Minimal zero-dependency local static server
└── README.md        # Project documentation
```
