const fs = require('fs');

const convertImageToBase64 = (filePath) => {
  try {
    
    const imageData = fs.readFileSync(filePath);

    const base64Image = imageData.toString('base64');

    return base64Image;
  } catch (error) {
    console.error('Error converting image to base64:', error.message);
    return null;
  }
};

module.exports = { convertImageToBase64 };
