import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const TaskCard = ({ task, editTask, deleteTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(task.content);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editState, setEditState] = useState(task.state);
  const [timerActive, setTimerActive] = useState(false);
  const [timeValue, setTimeValue] = useState('00:00:00');
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer = null;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0 && timerActive) {
      setTimerActive(false);
      clearInterval(timer);
      setIsAlertModalOpen(true);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft]);

  const convertTimeToSeconds = (time) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenTimerModal = () => {
    setIsTimerModalOpen(true);
  };

  const handleCloseTimerModal = () => {
    setIsTimerModalOpen(false);
  };

  const handleSetTimer = () => {
    const seconds = convertTimeToSeconds(timeValue);
    setTimeLeft(seconds);
    setTimerActive(true);
    handleCloseTimerModal();
  };

  const handleRemoveTimer = () => {
    setTimerActive(false);
    setTimeLeft(0);
    setTimeValue('00:00:00');
  };

  const handleEditSave = () => {
    editTask(task.id, editContent, editState, editDescription);
    setIsModalOpen(false);
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
  };

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours}h:${minutes}m:${seconds}s`;
  };

  return (
    <>
      <div onClick={handleOpenModal} style={{ padding: '10px', margin: '5px', backgroundColor: '#f4f4f4', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ marginBottom: '10px' }}>{task.content}</span>
        <p style={{ fontSize: '0.9em', color: '#666' }}>{task.description}</p>
        <select value={editState} onChange={(e) => setEditState(e.target.value)} style={{ padding: '4px', margin: '4px' }}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {timerActive && <p>Time left: {formatTimeLeft()}</p>}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Task Details"
        style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '420px', padding: '24px', borderRadius: '12px', backgroundColor: '#fff' } }}>
        <h2>Edit Task</h2>
        <input type="text" value={editContent} onChange={(e) => setEditContent(e.target.value)} style={{ padding: '6px', margin: '6px', width: '100%' }} />
        <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} style={{ padding: '12px', margin: '6px', width: '100%' }} />
        <select value={editState} onChange={(e) => setEditState(e.target.value)} style={{ padding: '6px', margin: '6px', width: '100%' }}>
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <button onClick={handleOpenTimerModal} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}>Set Timer</button>
          <button onClick={handleRemoveTimer} style={{ padding: '8px', backgroundColor: '#FF6347', color: 'white', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }}>Remove Timer</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', margin: '10px 0' }}>
          <button onClick={handleEditSave} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}>Save</button>
          <button onClick={() => deleteTask(task.id)} style={{ padding: '8px', backgroundColor: '#F44336', color: 'white', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }}>Delete</button>
        </div>
      </Modal>
      <Modal
        isOpen={isTimerModalOpen}
        onRequestClose={handleCloseTimerModal}
        contentLabel="Set Timer"
        style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
        <h2>Timer</h2>
        <input type="text" value={timeValue} onChange={(e) => setTimeValue(e.target.value)} style={{ textAlign: 'center', fontSize: '1.5em', padding: '5px', margin: '20px auto', display: 'block', width: '100%' }} placeholder="HH:MM:SS" />
        <button onClick={handleSetTimer} style={{ padding: '10px', margin: '5px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Set</button>
        <button onClick={handleCloseTimerModal} style={{ padding: '10px', margin: '5px', backgroundColor: '#FF6347', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
      </Modal>
      <Modal
        isOpen={isAlertModalOpen}
        onRequestClose={handleCloseAlertModal}
        contentLabel="Timer Alert"
        style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
        <h2>Timer Alert</h2>
        <p>The timer for the task "{task.content}" has finished.</p>
        <button onClick={handleCloseAlertModal} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>OK</button>
      </Modal>
    </>
  );
};

export default TaskCard;
