import React, { useState } from 'react';
import Modal from 'react-modal';
import { ReactMic } from 'react-mic';

const VoiceNoteModal = ({ isOpen, onClose, addVoiceNote }) => {
  const [record, setRecord] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [title, setTitle] = useState('');
  const [transcribe, setTranscribe] = useState(false); // Estado para transcripción

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    setBlobURL(recordedBlob.blobURL);
    if (transcribe) {
      const transcript = await transcribeAudio(recordedBlob.blob);
      console.log('Transcription:', transcript);
      // Implementar almacenamiento de la transcripción si es necesario
    }
  };

  const transcribeAudio = async (blob) => {
    // Aquí puedes integrar con un servicio de transcripción como Google Cloud Speech-to-Text, AWS Transcribe, etc.
    // Esto es solo un placeholder para el ejemplo
    return 'Transcribed text of the audio';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVoiceNote({
      title,
      audioURL: blobURL,
      createdDate: new Date().toLocaleString('en-GB', { hour12: false })
    });
    setTitle('');
    setBlobURL('');
    setTranscribe(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add Voice Note" style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', width: '300px', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' } }}>
      <h2>Add Voice Note</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label htmlFor="noteTitle">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <label htmlFor="transcribe">Transcribe Audio:</label>
          <input type="checkbox" checked={transcribe} onChange={() => setTranscribe(!transcribe)} style={{ margin: '10px' }} />
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="#FF4081"
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={startRecording} style={{ padding: '10px', backgroundColor: '#3F51B5', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Start</button>
            <button type="button" onClick={stopRecording} style={{ padding: '10px', backgroundColor: '#FF6347', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Stop</button>
          </div>
          {blobURL && <audio controls src={blobURL} style={{ marginTop: '10px' }} />}
          <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default VoiceNoteModal;
