import React, { useState } from 'react';
import Modal from 'react-modal';

const AddNoteModal = ({ isOpen, onClose, addNote }) => {
  const [noteContent, setNoteContent] = useState('');
  const [isTaskList, setIsTaskList] = useState(false);
  const [tasks, setTasks] = useState([{ content: '', done: false }]);

  const handleNoteChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleTaskListToggle = () => {
    setIsTaskList(!isTaskList);
    setTasks([{ content: '', done: false }]);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, content: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, { content: '', done: false }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTaskList) {
      addNote(noteContent, isTaskList, tasks);
    } else {
      addNote(noteContent, isTaskList, []);
    }
    setNoteContent('');
    setTasks([{ content: '', done: false }]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Note" style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label htmlFor="noteContent">Note Content:</label>
          <textarea name="noteContent" value={noteContent} onChange={handleNoteChange} placeholder="Enter note content" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <label>
            <input type="checkbox" checked={isTaskList} onChange={handleTaskListToggle} /> Is this a task list?
          </label>
          {isTaskList && tasks.map((task, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
              <input type="text" value={task.content} onChange={(e) => handleTaskChange(index, e.target.value)} placeholder="Task description" style={{ flexGrow: 1, padding: '5px' }} />
            </div>
          ))}
          {isTaskList && <button type="button" onClick={handleAddTask} style={{ padding: '5px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Add Task</button>}
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add Note</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddNoteModal;
