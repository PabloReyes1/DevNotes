import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import NotesPage from './pages/NotesPage'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/notes" element={<NotesPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
