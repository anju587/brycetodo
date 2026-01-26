import React, { useState } from 'react';
import SubtaskModal from './SubtaskModal';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onAddSubtask, onDeleteSubtask }) => {
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <article className="task-item">
      <div className="task-header">
        <div className="task-title-section">
          <h3 className="task-name">{task.name}</h3>
          {hasSubtasks && (
            <span className="subtask-count">
              {task.subtasks.length} {task.subtasks.length === 1 ? 'subtask' : 'subtasks'}
            </span>
          )}
        </div>
        <div className="task-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.name}`}
          >
            Edit
          </button>
          <button 
            className="action-btn add-subtask-btn" 
            onClick={() => setShowSubtaskModal(true)}
            aria-label="Add subtask"
          >
            <span className="btn-icon">+</span>
            Add Subtask
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(task.id)}
            aria-label={`Delete task: ${task.name}`}
          >
            Delete
          </button>
        </div>
      </div>
      
      {hasSubtasks && (
        <div className="subtasks">
          <div className="subtasks-header">
            <h4 className="subtasks-title">Subtasks</h4>
          </div>
          <ul className="subtasks-list" role="list">
            {task.subtasks.map((subtask, index) => (
              <li key={subtask.id} className="subtask-item" role="listitem">
                <span className="subtask-name">{subtask.name}</span>
                <button 
                  className="delete-subtask-btn"
                  onClick={() => onDeleteSubtask(task.id, subtask.id)}
                  aria-label={`Delete subtask: ${subtask.name}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showSubtaskModal && (
        <SubtaskModal
          taskId={task.id}
          onSubmit={(name) => {
            onAddSubtask(task.id, name);
            setShowSubtaskModal(false);
          }}
          onCancel={() => setShowSubtaskModal(false)}
        />
      )}
    </article>
  );
};

export default TaskItem;
