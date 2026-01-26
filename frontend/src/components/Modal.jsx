import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ title, initialValue = '', onSubmit, onCancel }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

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
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="task-input" className="form-label">
              Task Name
            </label>
            <input
              id="task-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter task name"
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
              aria-label={title.includes('Add') ? 'Add task' : 'Update task'}
            >
              {title.includes('Add') ? 'Add' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
