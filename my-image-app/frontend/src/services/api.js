// /frontend/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed. Please try again.');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed. Invalid email or password.');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error(error.message);
  }
};
