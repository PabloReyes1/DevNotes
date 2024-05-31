import React from 'react';
import './NoteCard.css'; // Importa el archivo CSS para los estilos

const TaskListCard = ({ note, openEditModal, updateTaskStatus }) => {
  const handleCardClick = (event) => {
    if (!event.target.classList.contains('task-checkbox')) {
      openEditModal(note);
    }
  };

  const handleTaskToggle = (index, event) => {
    event.stopPropagation();
    updateTaskStatus(note.id, index);
  };

  return (
    <div className="note-card" onClick={handleCardClick}>
      <div className="note-timestamp">{note.createdDate}</div>
      <h3>{note.title}</h3>
      {note.description && <p>{note.description}</p>}
      <div>
        {note.tasks.map((task, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', textDecoration: task.done ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.done}
              onChange={(event) => handleTaskToggle(index, event)}
              style={{ marginRight: '10px' }}
            />
            <span>{task.content}</span>
          </div>
        ))}
      </div>
      {note.reminder && <p>Reminder: {new Date(note.reminder).toLocaleString()}</p>}
    </div>
  );
};

export default TaskListCard;
