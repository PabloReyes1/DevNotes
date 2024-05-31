import React, { useState } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';
import './AddNoteModal.css';
// Parte de AddNoteModal.js y EditNoteModal.js

import RichTextEditor from './RichTextEditor'; // Importa el editor de texto enriquecido

const AddNoteModal = ({ isOpen, onClose, addNote, isTaskList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([{ content: '', done: false }]);
  const [reminder, setReminder] = useState(null);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('General');
  const [format, setFormat] = useState('richtext'); // Default format

  const handleAddTask = () => {
    setTasks([...tasks, { content: '', done: false }]);
  };

  const handleTaskContentChange = (index, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, content: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAdditionTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      title,
      description,
      isTaskList: isTaskList,
      tasks: isTaskList ? tasks.filter(task => task.content.trim()) : [],
      reminder,
      tags,
      category,
      format,
    });
    setTitle('');
    setDescription('');
    setTasks([{ content: '', done: false }]);
    setReminder(null);
    setTags([]);
    setCategory('General');
    setFormat('richtext');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel={isTaskList ? "Add Task List" : "Add Note"} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
      <h2>{isTaskList ? 'Add Task List' : 'Add New Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label htmlFor="noteTitle">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <label htmlFor="noteDescription">Description:</label>
          <RichTextEditor content={description} onChange={setDescription} format={format} />
          {isTaskList && tasks.map((task, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
              <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} placeholder="Task description" style={{ flexGrow: 1, padding: '5px' }} />
            </div>
          ))}
          {isTaskList && <button type="button" onClick={handleAddTask} style={{ padding: '5px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Add Task</button>}
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
          <label htmlFor="format">Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
            <option value="richtext">Rich Text</option>
            <option value="markdown">Markdown</option>
          </select>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>{isTaskList ? 'Add Task List' : 'Add Note'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;
