import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onAddSubtask, onDeleteSubtask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <div className="empty-state-icon">📝</div>
          <h2 className="empty-state-title">No tasks yet</h2>
          <p className="empty-state-message">
            Click "Add Todo" in the header to create your first task!
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="task-list" aria-label="Task list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddSubtask={onAddSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </section>
  );
};

export default TaskList;
