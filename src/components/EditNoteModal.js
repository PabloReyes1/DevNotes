import React, { useState } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';
import './EditNoteModal.css';
import RichTextEditor from './RichTextEditor';

const EditNoteModal = ({ isOpen, onClose, note, editNote, deleteNote }) => {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [tasks, setTasks] = useState(note.tasks);
  const [reminder, setReminder] = useState(note.reminder);
  const [tags, setTags] = useState(note.tags);
  const [category, setCategory] = useState(note.category);
  const [format, setFormat] = useState(note.format);

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
    editNote(note.id, {
      title,
      description,
      tasks,
      reminder,
      tags,
      category,
      format,
      isTaskList: note.isTaskList,
    });
    onClose();
  };

  const handleDelete = () => {
    deleteNote(note.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit Note" className="note-modal">
      <h2>Edit {note.isTaskList ? 'Task List' : 'Note'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="note-modal-content">
          <label htmlFor="noteTitle">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
          <label htmlFor="noteDescription">Description:</label>
          <RichTextEditor content={description} onChange={setDescription} format={format} />
          {note.isTaskList && tasks.map((task, index) => (
            <div key={index} className="task-input">
              <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} placeholder="Task description" />
            </div>
          ))}
          {note.isTaskList && <button type="button" onClick={handleAddTask} className="add-task-button">Add Task</button>}
          <label htmlFor="noteReminder">Reminder:</label>
          <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />
          <label htmlFor="tags">Tags:</label>
          <ReactTags
            tags={tags}
            handleDelete={handleDeleteTag}
            handleAddition={handleAdditionTag}
            allowUnique={true}
            placeholder="Add a tag"
          />
          <label htmlFor="category">Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <label htmlFor="format">Format:</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="richtext">Rich Text</option>
            <option value="markdown">Markdown</option>
          </select>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" onClick={handleDelete} style={{ padding: '10px', backgroundColor: '#F44336', color: 'white', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>Delete</button>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>Save</button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditNoteModal;
