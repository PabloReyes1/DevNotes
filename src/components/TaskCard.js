import React, { useState } from 'react';

const TaskCard = ({ task, editTask, deleteTask, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditContent(task.content);
    setEditDescription(task.description);
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleEditSave = () => {
    editTask(task.id, editContent, task.state, editDescription); // Update content and description
    setIsEditing(false);
  };

  const handleStateChange = (e) => {
    editTask(task.id, task.content, e.target.value, task.description); // Update state
  };

  return (
    <div style={{ padding: '10px', margin: '5px', backgroundColor: '#f4f4f4', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input type="text" value={editContent} onChange={handleEditChange} style={{ padding: '5px', margin: '5px' }} />
          <textarea value={editDescription} onChange={handleEditDescriptionChange} style={{ padding: '5px', margin: '5px' }} />
        </>
      ) : (
        <>
          <span style={{ marginBottom: '10px' }}>{task.content}</span>
          <p style={{ fontSize: '0.9em', color: '#666' }}>{task.description}</p>
        </>
      )}
      <div>
        <select value={task.state} onChange={handleStateChange} style={{ margin: '5px', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {isEditing ? (
          <button onClick={handleEditSave} style={{ margin: '5px', backgroundColor: '#4CAF50', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        ) : (
          <>
            <button onClick={handleEditStart} style={{ margin: '5px', backgroundColor: '#FF9800', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
            <button onClick={() => deleteTask(task.id)} style={{ margin: '5px', backgroundColor: '#F44336', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
