const Image = require('../models/Image');

// Upload an image
exports.uploadImage = async (req, res) => {
  const { userId, url } = req.body;

  try {
    const newImage = new Image({ userId, url });
    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get images of a user
exports.getUserImages = async (req, res) => {
  const { userId } = req.params;

  try {
    const images = await Image.find({ userId });
    res.json({ images });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
