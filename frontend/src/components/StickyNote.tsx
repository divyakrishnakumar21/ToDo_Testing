
import React, { useState } from "react";
import './StickyNotes.css';

interface StickyNoteProps {
  text: string;
  color?: string;
  onDelete?: () => void;
  onEdit?: (newText: string) => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ text, color = "#FFEB3B", onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSave = () => {
    setEditing(false);
    if (onEdit) onEdit(editText);
  };

  return (
    <div className="sticky-note" style={{ background: color, position: 'relative' }}>
      <button
        className="sticky-note-delete"
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: 6,
          right: 8,
          background: 'transparent',
          border: 'none',
          fontSize: '1.2em',
          color: '#d32f2f',
          cursor: 'pointer',
          zIndex: 2,
        }}
        aria-label="Delete note"
      >
        ×
      </button>
      {editing ? (
        <>
          <textarea
            value={editText}
            onChange={e => setEditText(e.target.value)}
            style={{
              width: '100%',
              minHeight: '80px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              padding: '8px',
              fontFamily: 'inherit',
              fontSize: '1em',
              marginBottom: '8px',
              resize: 'vertical',
            }}
          />
          <button
            onClick={handleSave}
            style={{
              background: '#FFD700',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >Save</button>
        </>
      ) : (
        <div onDoubleClick={handleEdit} style={{ cursor: 'pointer', minHeight: '80px' }}>{editText}</div>
      )}
    </div>
  );
};

export default StickyNote;
