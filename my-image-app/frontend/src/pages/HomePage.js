import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by checking for a token in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token, redirect to login page
      navigate('/login');
    } else {
      // If authenticated, fetch images
      fetchImages();
    }
  }, [navigate]);

  const fetchImages = async () => {
    try {
      console.log('Fetching images...');
      // Assuming you have a backend API to get images
      const response = await fetch('/api/images'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      console.log('Fetched images:', data);
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Error fetching images. Please try again later.');
    } finally {
      setLoading(false); // Hide loading spinner after API call completes
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const retryFetch = () => {
    setLoading(true);
    setError('');
    fetchImages();
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Home Page!</h1>

      {loading && <p>Loading images...</p>} {/* Show loading state */}
      {error && (
        <div>
          <p style={styles.error}>{error}</p>
          <button onClick={retryFetch} style={styles.retryButton}>
            Retry
          </button>
        </div>
      )}

      <p>Here are your uploaded images:</p>
      <div className="image-gallery" style={styles.imageGallery}>
        {images.length === 0 ? (
          <p>No images found.</p>
        ) : (
          images.map((image) => (
            <div key={image._id} className="image-card" style={styles.imageCard}>
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.title || 'Uploaded image'}
                  style={styles.image}
                />
              ) : (
                <p>Image not available</p>
              )}
              <p>{image.title || 'Untitled'}</p>
            </div>
          ))
        )}
      </div>

      <button onClick={handleLogin} style={styles.button}>
        Go to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
  },
  retryButton: {
    padding: '10px 20px',
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  imageGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '20px',
  },
  imageCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default HomePage;
