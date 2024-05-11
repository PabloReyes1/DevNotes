import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ columnId, tasks, title, editTask, deleteTask }) => {
  return (
    <div style={{ margin: '8px', border: '1px solid lightgrey', borderRadius: '5px', width: '300px', backgroundColor: '#e2e2e2', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', padding: '10px' }}>
      <h3 style={{ textAlign: 'center', color: '#333' }}>{title}</h3>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={{ padding: '8px', minHeight: '100px' }}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCard task={task} index={index} editTask={editTask} deleteTask={deleteTask} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
