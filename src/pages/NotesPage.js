import React, { useState, useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import AddNoteModal from '../components/AddNoteModal';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const NotesPage = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content, isTaskList, tasks) => {
    const newNote = {
      id: 'note' + (notes.length + 1),
      content,
      isTaskList,
      tasks
    };
    setNotes([...notes, newNote]);
  };

  const editNote = (id, newContent, newTasks) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: newContent, tasks: newTasks } : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <h1 style={{ textAlign: 'center', color: '#5C6BC0' }}>Notes Manager</h1>
      <button onClick={openModal} style={{ margin: '10px', padding: '10px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add Note</button>
      <AddNoteModal isOpen={isModalOpen} onClose={closeModal} addNote={addNote} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} editNote={editNote} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
