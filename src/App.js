import React, { useState, useEffect } from "react";
import MarkdownInput from "./MarkdownInput";
import NoteDisplay from "./NoteDisplay";
// Import des fichiers CSS globaux
import "./App.css"; // Si tu as un fichier CSS global pour les styles généraux
import "./MarkdownInput.css"; // Pour les styles du composant MarkdownInput
import "./NoteDisplay.css"; // Pour les styles du composant NoteDisplay

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [{ id: 1, title: "Nouvelle note", content: "" }];
  });

  const [selectedNoteId, setSelectedNoteId] = useState(notes[0].id);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nouvelle note",
      content: "",
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  // Styles
  const appStyle = { display: "flex", height: "100vh" };
  const sidebarStyle = {
    width: "20%",
    padding: "10px",
    borderRight: "1px solid #ccc",
    overflowY: "auto",
  };
  const mainContentStyle = {
    width: "80%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const noteContainerStyle = { width: "80%" };
  const noteItemStyle = { cursor: "pointer" };

  return (
    <div className="App">
      {/* Barre de navigation */}
      <nav className="navbar">
        <h5 className="navbar-title">Votre Super Bloc Note</h5>
      </nav>

      <div style={appStyle}>
        {/* Sidebar */}
        <div style={sidebarStyle}>
          <button onClick={handleAddNote} className="btn btn-primary mb-3">
            Ajouter une nouvelle note
          </button>
          <ul className="list-group">
            {notes.map((note) => (
              <li
                key={note.id}
                className={`list-group-item ${
                  note.id === selectedNoteId ? "active" : ""
                }`}
                onClick={() => setSelectedNoteId(note.id)}
                style={noteItemStyle}
              >
                <strong>{note.title}</strong>
                <p>{note.content.split(" ").slice(0, 15).join(" ")}...</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column for NoteDisplay and MarkdownInput */}
        <div style={mainContentStyle}>
          {selectedNote && (
            <div style={noteContainerStyle}>
              {/* Affichage en haut */}
              <NoteDisplay markdown={selectedNote.content} />
              {/* Champ d'édition en bas */}
              <MarkdownInput
                note={selectedNote}
                onNoteUpdate={handleUpdateNote}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
