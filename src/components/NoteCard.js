import React from 'react';
import './NoteCard.css';
import ReactMarkdown from 'react-markdown';

const NoteCard = ({ note, openEditModal }) => {
  const handleCardClick = () => {
    openEditModal(note);
  };

  return (
    <div className="note-card" onClick={handleCardClick}>
      <div className="note-timestamp">{note.createdDate}</div>
      <h3>{note.title}</h3>
      {note.format === 'markdown' ? (
        <ReactMarkdown>{note.description}</ReactMarkdown>
      ) : (
        <p>{note.description}</p>
      )}
      {note.reminder && <p>Reminder: {new Date(note.reminder).toLocaleString()}</p>}
    </div>
  );
};

export default NoteCard;
