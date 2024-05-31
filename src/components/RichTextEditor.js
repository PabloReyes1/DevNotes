import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ content, onChange, format }) => {
  if (format === 'markdown') {
    return (
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write in Markdown..."
        style={{ width: '100%', height: '200px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
      />
    );
  }

  return (
    <ReactQuill value={content} onChange={onChange} theme="snow" />
  );
};

export default RichTextEditor;
