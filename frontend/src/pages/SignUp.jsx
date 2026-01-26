import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/axiosConfig';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/register', formData);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.password_confirmation.trim() !== '';

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading || !isFormValid}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="auth-links">
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
