import React, { useState } from 'react';
import Modal from 'react-modal';
import './EditNoteModal.css'; // Importa el archivo CSS para los estilos

const EditNoteModal = ({ isOpen, onClose, note, editNote, deleteNote }) => {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [editTasks, setEditTasks] = useState(note.tasks);
  const [reminder, setReminder] = useState(note.reminder);

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
      tasks: editTasks,
      reminder
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Note" style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
      <div className="edit-note-header">
        <h2>{note.isTaskList ? 'Edit Task List' : 'Edit Note'}</h2>
        <div className="note-timestamp">{note.createdDate}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label htmlFor="noteTitle">Title:</label>
        <input type="text" value={editTitle} onChange={handleTitleChange} placeholder="Note title" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <label htmlFor="noteDescription">Description:</label>
        <textarea value={editDescription} onChange={handleDescriptionChange} placeholder="Note description" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        {note.isTaskList && editTasks.map((task, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
            <input type="checkbox" checked={task.done} onChange={() => handleTaskToggle(index)} style={{ marginRight: '10px' }} />
            <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} style={{ flexGrow: 1, padding: '5px' }} />
          </div>
        ))}
        <label htmlFor="noteReminder">Reminder:</label>
        <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <button onClick={handleEditSave} style={{ margin: '5px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        <button onClick={() => deleteNote(note.id)} style={{ margin: '5px', backgroundColor: '#F44336', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
      </div>
    </Modal>
  );
};

export default EditNoteModal;
