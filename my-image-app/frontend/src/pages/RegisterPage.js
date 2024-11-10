import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    
    const userData = {
      username,
      email,
      password,
    };

    setLoading(true); // Set loading to true when registration starts
    setError('');  // Reset error message on new submission

    try {
      // Make POST request to backend for user registration
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
        body: JSON.stringify(userData), // Convert user data to JSON
      });

      // If response is not ok (status code 2xx), handle error
      if (!response.ok) {
        const text = await response.text(); // Get the error text if response is not OK
        console.error('Error:', text); // Log server error for debugging
        setError('Error: ' + text); // Show the error message in UI
        setLoading(false); // Set loading to false after the request
        return;
      }

      // Parse the JSON response from the backend
      const data = await response.json();

      // If registration is successful, navigate to the login page
      if (data.success) {
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // If there was a network error or any other issue
      setError('An error occurred: ' + err.message);
    } finally {
      setLoading(false); // Set loading to false after request finishes
    }
  };

  return (
    <div style={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleRegister} style={styles.form}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>} {/* Display error if any */}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p style={styles.link}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

// Styles for the form
const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  link: {
    marginTop: '20px',
    fontSize: '14px',
  },
};

export default Register;
