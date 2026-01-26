import React from 'react';
import './Header.css';

const Header = ({ userName, onAddTodo, onLogout }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-name">Todo App</h1>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span className="user-label">User:</span>
            <span className="user-name">{userName}</span>
          </div>
          <button 
            className="add-todo-btn" 
            onClick={onAddTodo}
            aria-label="Add new todo"
          >
            <span className="btn-icon">+</span>
            Add Todo
          </button>
          <button 
            className="logout-btn" 
            onClick={onLogout}
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
