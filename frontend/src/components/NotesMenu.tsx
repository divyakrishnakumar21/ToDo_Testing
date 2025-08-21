import React, { useState } from "react";
import StickyNote from "./StickyNote";

const initialNotes = [
  { text: "Buy groceries", color: "#FFEB3B" },
  { text: "Call John", color: "#FFCDD2" },
  { text: "Finish project report", color: "#C8E6C9" },
];

const NotesMenu: React.FC = () => {

  const [notes, setNotes] = useState(initialNotes);

  const addBlankNote = () => {
    setNotes([...notes, { text: "", color: "#FFF9C4" }]);
  };

  const deleteNote = (idx: number) => {
    setNotes(notes => notes.filter((_, i) => i !== idx));
  };

  const editNote = (idx: number, newText: string) => {
    setNotes(notes => notes.map((note, i) => i === idx ? { ...note, text: newText } : note));
  };

  return (
    <div style={{ padding: "32px" }}>
      <h2 style={{ marginBottom: "24px" }}>Sticky Notes</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {notes.map((note, idx) => (
          <StickyNote
            key={idx}
            text={note.text}
            color={note.color}
            onDelete={() => deleteNote(idx)}
            onEdit={newText => editNote(idx, newText)}
          />
        ))}
      </div>
      <div style={{ marginTop: "32px" }}>
        <button onClick={addBlankNote} style={{ padding: "10px 20px", fontSize: "1.1em", borderRadius: "6px", background: "#FFD700", border: "none", cursor: "pointer", fontWeight: 700 }}>
          Add New Note
        </button>
      </div>
    </div>
  );
};

export default NotesMenu;
