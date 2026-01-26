import React, { useState } from 'react';
import './Modal.css';

const SubtaskModal = ({ onSubmit, onCancel }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="subtask-modal-title"
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="modal-header">
          <h2 id="subtask-modal-title" className="modal-title">Add Subtask</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="subtask-input" className="form-label">
              Subtask Name
            </label>
            <input
              id="subtask-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter subtask name"
              className="form-input"
              autoFocus
              required
              aria-required="true"
            />
          </div>
          <div className="modal-actions">
            <button 
              type="button" 
              className="modal-btn cancel-btn" 
              onClick={onCancel}
              aria-label="Cancel"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="modal-btn submit-btn" 
              disabled={!value.trim()}
              aria-label="Add subtask"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubtaskModal;
