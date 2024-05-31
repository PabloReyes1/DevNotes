import React, { useState } from 'react';
import VoiceNoteModal from '../components/VoiceNoteModal';
import Modal from 'react-modal';

const VoiceNotesPage = () => {
  const [voiceNotes, setVoiceNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addVoiceNote = (voiceNote) => {
    setVoiceNotes([...voiceNotes, { ...voiceNote, id: `voice-note-${voiceNotes.length + 1}` }]);
  };

  const deleteVoiceNote = (id) => {
    setVoiceNotes(voiceNotes.filter(note => note.id !== id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Voice Notes</h2>
      <button onClick={openModal} style={{ padding: '10px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Add Voice Note</button>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Add Voice Note" style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
        <VoiceNoteModal isOpen={isModalOpen} onClose={closeModal} addVoiceNote={addVoiceNote} />
      </Modal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {voiceNotes.map(note => (
          <div key={note.id} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', position: 'relative' }}>
            <h3>{note.title}</h3>
            <audio controls src={note.audioURL} style={{ marginTop: '10px' }} />
            <button onClick={() => deleteVoiceNote(note.id)} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' }}>×</button>
            <div className="note-timestamp" style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#999' }}>{note.createdDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceNotesPage;
