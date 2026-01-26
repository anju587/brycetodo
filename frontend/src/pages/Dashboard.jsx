import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import api from '../utils/axiosConfig';
import './Dashboard.css';

const Dashboard = ({ setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/todos');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskName) => {
    try {
      const response = await api.post('/todos', { name: taskName });
      setTasks([...tasks, response.data]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleEditTask = async (taskId, taskName) => {
    try {
      const response = await api.put(`/todos/${taskId}`, { name: taskName });
      setTasks(tasks.map(task => task.id === taskId ? response.data : task));
      setShowEditModal(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/todos/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleAddSubtask = async (taskId, subtaskName) => {
    try {
      const response = await api.post(`/todos/${taskId}/subtasks`, { name: subtaskName });
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, subtasks: [...(task.subtasks || []), response.data] }
          : task
      ));
    } catch (err) {
      console.error('Error adding subtask:', err);
    }
  };

  const handleDeleteSubtask = async (taskId, subtaskId) => {
    try {
      await api.delete(`/todos/${taskId}/subtasks/${subtaskId}`);
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, subtasks: task.subtasks.filter(st => st.id !== subtaskId) }
          : task
      ));
    } catch (err) {
      console.error('Error deleting subtask:', err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard">
      <Header 
        userName={user.name || user.email} 
        onAddTodo={() => setShowAddModal(true)}
        onLogout={handleLogout}
      />
      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            onAddSubtask={handleAddSubtask}
            onDeleteSubtask={handleDeleteSubtask}
          />
        )}
      </div>
      <Footer />
      
      {showAddModal && (
        <Modal
          title="Add Todo"
          onSubmit={handleAddTask}
          onCancel={() => setShowAddModal(false)}
        />
      )}
      
      {showEditModal && editingTask && (
        <Modal
          title="Edit Todo"
          initialValue={editingTask.name}
          onSubmit={(name) => handleEditTask(editingTask.id, name)}
          onCancel={() => {
            setShowEditModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
