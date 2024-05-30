import React, { useState } from 'react';

const NoteCard = ({ note, editNote, deleteNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [editTasks, setEditTasks] = useState(note.tasks);

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleTaskContentChange = (index, value) => {
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
    editNote(note.id, {
      title: editTitle,
      description: editDescription,
      tasks: editTasks
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: '10px', margin: '5px', backgroundColor: '#e3f2fd', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {isEditing ? (
        <>
          <input type="text" value={editTitle} onChange={handleTitleChange} style={{ padding: '5px', margin: '5px', width: '100%' }} />
          <textarea value={editDescription} onChange={handleDescriptionChange} style={{ padding: '10px', margin: '5px', width: '100%' }} />
          {note.isTaskList && editTasks.map((task, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
              <input type="checkbox" checked={task.done} onChange={() => handleTaskToggle(index)} style={{ marginRight: '10px' }} />
              <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} style={{ flexGrow: 1, padding: '5px' }} />
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          {note.isTaskList ? (
            <div>
              {note.tasks.map((task, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', textDecoration: task.done ? 'line-through' : 'none' }}>
                  <input type="checkbox" checked={task.done} onChange={() => handleTaskToggle(index)} style={{ marginRight: '10px' }} />
                  <span>{task.content}</span>
                </div>
              ))}
            </div>
          ) : <p>{note.description}</p>}
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
