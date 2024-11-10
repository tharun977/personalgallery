import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="gallery">
        {images.map((image) => (
          <img key={image._id} src={image.url} alt={image.name} />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
