import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from '../components/TaskColumn';
import Modal from 'react-modal';

Modal.setAppElement('#root');


const initialTasks = {
  'todo': [{ id: 't1', content: 'Task 1', description: 'Complete the initial setup.', state: 'todo' }],
  'inProgress': [{ id: 't2', content: 'Task 2', description: 'Work on the main feature.', state: 'inProgress' }],
  'done': [{ id: 't3', content: 'Task 3', description: 'Finalize the project.', state: 'done' }]
};

const TasksPage = () => {
  const [tasks, setTasks] = useState(() =>  initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const sourceItems = Array.from(sourceColumn);
    const destItems = sourceColumn === destColumn ? sourceItems : Array.from(destColumn);
    const [removed] = sourceItems.splice(source.index, 1);
    removed.state = destination.droppableId; // Update state to reflect new column

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
    } else {
      destItems.splice(destination.index, 0, removed);
    }

    setTasks({
      ...tasks,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems
    });
  };

  const addTask = (content, state, description) => {
    const newId = 't' + (Object.keys(tasks.todo).length + Object.keys(tasks.inProgress).length + Object.keys(tasks.done).length + 1);
    const newTask = { id: newId, content, state, description };
    setTasks({
      ...tasks,
      [state]: [...tasks[state], newTask]
    });
  };

  const editTask = (id, newContent, newState, newDescription) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      for (let column in newTasks) {
        const index = newTasks[column].findIndex(task => task.id === id);
        if (index !== -1) {
          newTasks[column].splice(index, 1);
          break;
        }
      }
      newTasks[newState] = [...newTasks[newState], { id, content: newContent, state: newState, description: newDescription }];
      return newTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      for (let column in newTasks) {
        newTasks[column] = newTasks[column].filter(task => task.id !== id);
      }
      return newTasks;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ textAlign: 'center', color: '#5C6BC0' }}>Task Board</h1>
      <button onClick={openModal} style={{ margin: '10px', padding: '10px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add Task</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
        <h2>Add New Task</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          addTask(e.target.elements.taskContent.value, e.target.elements.taskState.value, e.target.elements.taskDescription.value);
          e.target.elements.taskContent.value = '';
          e.target.elements.taskDescription.value = '';
          closeModal();
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor="taskContent">Task:</label>
            <input type="text" name="taskContent" placeholder="Enter a new task" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <label htmlFor="taskDescription">Description:</label>
            <textarea name="taskDescription" placeholder="Enter a description" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
            <label htmlFor="taskState">State:</label>
            <select name="taskState" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add Task</button>
          </div>
        </form>
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', overflow: 'auto' }}>
          {Object.keys(tasks).map((id) => (
            <TaskColumn key={id} columnId={id} tasks={tasks[id]} title={id.charAt(0).toUpperCase() + id.slice(1)} editTask={editTask} deleteTask={deleteTask} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TasksPage;
