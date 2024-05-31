import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import TaskListCard from '../components/TaskListCard';
import AddNoteModal from '../components/AddNoteModal';
import EditNoteModal from '../components/EditNoteModal';
import VoiceNoteModal from '../components/VoiceNoteModal';
import Modal from 'react-modal';
import './NotesPage.css';

Modal.setAppElement('#root');

const NotesPage = () => {
  const initialNotes = [
    {
      id: 'note1',
      title: 'Note 1',
      description: 'This is the first note.',
      isTaskList: false,
      tasks: [],
      reminder: null,
      createdDate: new Date().toLocaleString('en-GB', { hour12: false })
    },
    {
      id: 'note2',
      title: 'Task List 1',
      description: 'This is the first task list.',
      isTaskList: true,
      tasks: [
        { content: 'Task 1', done: false },
        { content: 'Task 2', done: false }
      ],
      reminder: null,
      createdDate: new Date().toLocaleString('en-GB', { hour12: false })
    },
    {
      id: 'note3',
      title: 'Note 2',
      description: 'This is the second note.',
      isTaskList: false,
      tasks: [],
      reminder: null,
      createdDate: new Date().toLocaleString('en-GB', { hour12: false })
    }
  ];

  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || initialNotes);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isTaskList, setIsTaskList] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      notes.forEach(note => {
        if (note.reminder && new Date(note.reminder) <= now) {
          alert(`Reminder for note: ${note.title}`);
        }
      });
    }, 60000); // Verifica cada minuto

    return () => clearInterval(interval);
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      id: 'note' + (notes.length + 1),
      title: note.title,
      description: note.description,
      isTaskList: isTaskList,
      tasks: note.tasks || [], // Asegúrate de que tasks esté inicializado
      reminder: note.reminder,
      createdDate: new Date().toLocaleString('en-GB', { hour12: false }),
      tags: note.tags || [],
      category: note.category || 'General',
      format: note.format || 'richtext',
    };
    setNotes([...notes, newNote]);
  };
  

  const editNote = (id, updatedNote) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const updateTaskStatus = (noteId, taskIndex) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        const updatedTasks = note.tasks.map((task, index) =>
          index === taskIndex ? { ...task, done: !task.done } : task
        );
        return { ...note, tasks: updatedTasks };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const openAddModal = (isTaskList) => {
    setIsTaskList(isTaskList);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  const openVoiceModal = () => setIsVoiceModalOpen(true);
  const closeVoiceModal = () => setIsVoiceModalOpen(false);

  const addVoiceNote = (voiceNote) => {
    const newNote = {
      id: 'note' + (notes.length + 1),
      title: voiceNote.title,
      description: '',
      isTaskList: false,
      tasks: [],
      reminder: null,
      createdDate: voiceNote.createdDate,
      tags: [],
      audioURL: voiceNote.audioURL
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="content">
      <h1 style={{ textAlign: 'center', color: '#5C6BC0' }}>DevNotes</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => openAddModal(false)} className="note-button">Add Note</button>
        <button onClick={() => openAddModal(true)} className="note-button">Add Task List</button>
        <button onClick={openVoiceModal} className="note-button">Add Voice Note</button>
      </div>
      <AddNoteModal isOpen={isAddModalOpen} onClose={closeAddModal} addNote={addNote} isTaskList={isTaskList} />
      {selectedNote && (
        <EditNoteModal isOpen={isEditModalOpen} onClose={closeEditModal} note={selectedNote} editNote={editNote} deleteNote={deleteNote} />
      )}
      <VoiceNoteModal isOpen={isVoiceModalOpen} onClose={closeVoiceModal} addVoiceNote={addVoiceNote} />
      <div className="notes-container">
        {notes.map(note => (
          note.isTaskList ? 
          <TaskListCard key={note.id} note={note} openEditModal={openEditModal} updateTaskStatus={updateTaskStatus} /> :
          <NoteCard key={note.id} note={note} openEditModal={openEditModal} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
