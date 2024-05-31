import React, { useState } from 'react';
import Modal from 'react-modal';

const AddNoteModal = ({ isOpen, onClose, addNote, isTaskList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([{ content: '', done: false }]);
  const [reminder, setReminder] = useState(null);

  const handleAddTask = () => {
    setTasks([...tasks, { content: '', done: false }]);
  };

  const handleTaskContentChange = (index, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, content: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      title,
      description,
      isTaskList: isTaskList,
      tasks: isTaskList ? tasks.filter(task => task.content.trim()) : [],
      reminder
    });
    setTitle('');
    setDescription('');
    setTasks([{ content: '', done: false }]);
    setReminder(null);
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
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Note description" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          {isTaskList && tasks.map((task, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
              <input type="text" value={task.content} onChange={(e) => handleTaskContentChange(index, e.target.value)} placeholder="Task description" style={{ flexGrow: 1, padding: '5px' }} />
            </div>
          ))}
          {isTaskList && <button type="button" onClick={handleAddTask} style={{ padding: '5px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Add Task</button>}
          <label htmlFor="noteReminder">Reminder:</label>
          <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>{isTaskList ? 'Add Task List' : 'Add Note'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;
