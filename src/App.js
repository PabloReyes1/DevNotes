import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkspaceSelector from './components/WorkspaceSelector';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage';
import StatisticsPage from './pages/StatisticsPage';
import VoiceNotesPage from './pages/VoiceNotesPage';
import './App.css';

function App() {
  const initialTasks = {
    'todo': [{ id: 't1', content: 'Task 1', description: 'Complete the initial setup.', state: 'todo', timer: { active: false, duration: 0 } }],
    'inProgress': [{ id: 't2', content: 'Task 2', description: 'Work on the main feature.', state: 'inProgress', timer: { active: false, duration: 0 } }],
    'done': [{ id: 't3', content: 'Finalize the project.', state: 'done', timer: { active: false, duration: 0 } }]
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <Router>
      <div className="App">
        <WorkspaceSelector />
        <div className="content">
          <Routes>
            <Route path="/tasks" element={<TasksPage tasks={tasks} setTasks={setTasks} />} />
            <Route path="/notes" element={<NotesPage notes={notes} setNotes={setNotes} />} />
            <Route path="/statistics" element={<StatisticsPage notes={notes} tasks={tasks} />} />
            <Route path="/voice-notes" element={<VoiceNotesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
