import React, { useState } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';
import './EditNoteModal.css';
import RichTextEditor from './RichTextEditor';

const EditNoteModal = ({ isOpen, onClose, note, editNote, deleteNote }) => {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [editTasks, setEditTasks] = useState(note.tasks);
  const [reminder, setReminder] = useState(note.reminder);
  const [tags, setTags] = useState(note.tags || []);
  const [category, setCategory] = useState(note.category || 'General'); // Default category

  const handleTitleChange = (e) => {
    setEditTitle(e.target.value);
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
      reminder,
      tags,
      category
    });
    onClose();
  };

  const handleDeleteTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAdditionTag = (tag) => {
    setTags([...tags, tag]);
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
        <RichTextEditor content={editDescription} onChange={setEditDescription} />
        {note.isTaskList && editTasks.map((task, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
            <input type="checkbox" checked={task.done} onChange={() => handleTaskToggle(index)} style={{ marginRight: '10px' }} />
            <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} style={{ flexGrow: 1, padding: '5px' }} />
          </div>
        ))}
        <label htmlFor="noteReminder">Reminder:</label>
        <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
        <label htmlFor="tags">Tags:</label>
        <ReactTags
          tags={tags}
          handleDelete={handleDeleteTag}
          handleAddition={handleAdditionTag}
          allowUnique={true}
          placeholder="Add a tag"
        />
        <label htmlFor="category">Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button onClick={handleEditSave} style={{ margin: '5px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        <button onClick={() => deleteNote(note.id)} style={{ margin: '5px', backgroundColor: '#F44336', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
      </div>
    </Modal>
  );
};

export default EditNoteModal;
