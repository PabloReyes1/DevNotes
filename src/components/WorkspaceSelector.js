import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import TasksPage from '../pages/TasksPage';
import NotesPage from '../pages/NotesPage';
import './WorkspaceSelector.css';

const WorkspaceSelector = () => {
  return (
    <Router>
      <div className="workspace-container">
        <div className="sidebar">
          <Link to="/tasks" className="sidebar-link">
            <FontAwesomeIcon icon={faTasks} className="icon" />
            Tasks
          </Link>
          <Link to="/notes" className="sidebar-link">
            <FontAwesomeIcon icon={faStickyNote} className="icon" />
            Notes
          </Link>
        </div>
        <div className="content">
          <Routes>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default WorkspaceSelector;
