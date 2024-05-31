import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const StatisticsPage = ({ notes, tasks }) => {
  const calculateStatistics = () => {
    let totalNotes = notes.length;
    let totalTasks = Object.values(tasks).reduce((acc, taskArray) => acc + taskArray.length, 0);
    let completedTasks = Object.values(tasks).reduce((acc, taskArray) => acc + taskArray.filter(task => task.done).length, 0);

    let notesByCategory = {
      'General': 0,
      'Work': 0,
      'Personal': 0
    };

    let tasksByCategory = {
      'todo': 0,
      'inProgress': 0,
      'done': 0
    };

    notes.forEach(note => {
      notesByCategory[note.category] = (notesByCategory[note.category] || 0) + 1;
    });

    tasks.todo.forEach(task => tasksByCategory.todo++);
    tasks.inProgress.forEach(task => tasksByCategory.inProgress++);
    tasks.done.forEach(task => tasksByCategory.done++);

    return {
      totalNotes,
      totalTasks,
      completedTasks,
      notesByCategory,
      tasksByCategory,
    };
  };

  const stats = calculateStatistics();
  const data = {
    labels: ['Total Notes', 'Total Tasks', 'Completed Tasks'],
    datasets: [
      {
        label: 'Statistics',
        data: [stats.totalNotes, stats.totalTasks, stats.completedTasks],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const notesCategoryData = {
    labels: Object.keys(stats.notesByCategory),
    datasets: [
      {
        label: 'Notes by Category',
        data: Object.values(stats.notesByCategory),
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)'
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const tasksCategoryData = {
    labels: Object.keys(stats.tasksByCategory),
    datasets: [
      {
        label: 'Tasks by Category',
        data: Object.values(stats.tasksByCategory),
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)'
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Statistics</h2>
      <Bar data={data} />
      <h2>Notes by Category</h2>
      <Bar data={notesCategoryData} />
      <h2>Tasks by Category</h2>
      <Bar data={tasksCategoryData} />
    </div>
  );
};

export default StatisticsPage;
