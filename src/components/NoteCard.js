import React, { useState } from 'react';

const NoteCard = ({ note, editNote, deleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const [editTasks, setEditTasks] = useState(note.tasks);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = editTasks.map((task, i) => 
      i === index ? { ...task, content: value } : task
    );
    setEditTasks(updatedTasks);
  };

  const handleTaskToggle = (index) => {
    const updatedTasks = editTasks.map((task, i) => 
      i === index ? { ...task, done: !task.done } : task
    );
    setEditTasks(updatedTasks);
  };

  const handleEditSave = () => {
    editNote(note.id, editContent, editTasks);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '10px', margin: '5px', backgroundColor: '#e3f2fd', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <textarea value={editContent} onChange={handleEditChange} style={{ padding: '10px', margin: '5px', width: '100%' }} />
          {note.isTaskList && editTasks.map((task, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <input type="checkbox" checked={task.done} onChange={() => handleTaskToggle(index)} style={{ marginRight: '10px' }} />
              <input type="text" value={task.content} onChange={(e) => handleTaskChange(index, e.target.value)} style={{ flexGrow: 1, padding: '5px' }} />
            </div>
          ))}
        </>
      ) : (
        <>
          <p style={{ fontSize: '1em', margin: '5px' }}>{note.content}</p>
          {note.isTaskList && note.tasks.map((task, index) => (
            <div key={index} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.content}</div>
          ))}
        </>
      )}
      <div>
        {isEditing ? (
          <button onClick={handleEditSave} style={{ margin: '5px', backgroundColor: '#4CAF50', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)} style={{ margin: '5px', backgroundColor: '#FF9800', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
        )}
        <button onClick={() => deleteNote(note.id)} style={{ margin: '5px', backgroundColor: '#F44336', color: 'white', padding: '5px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
