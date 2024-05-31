import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faStickyNote, faChartBar, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import './WorkspaceSelector.css';

const WorkspaceSelector = () => {
  return (
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
        <Link to="/statistics" className="sidebar-link">
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          Statistics
        </Link>
        <Link to="/voice-notes" className="sidebar-link">
          <FontAwesomeIcon icon={faMicrophone} className="icon" />
          Voice Notes
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceSelector;
