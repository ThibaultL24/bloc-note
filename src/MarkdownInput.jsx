import React, { useState, useEffect } from 'react';
import './MarkdownInput.css'; // Assurez-vous de créer ce fichier CSS

const MarkdownInput = ({ note, onNoteUpdate }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleSave = () => {
    const updatedNote = { ...note, title, content };
    onNoteUpdate(updatedNote);
  };

  return (
    <div className="markdown-input">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la note"
        className="input-title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        className="input-content"
      />
      <button onClick={handleSave} className="btn btn-success">Sauvegarder</button>
    </div>
  );
}

export default MarkdownInput;
