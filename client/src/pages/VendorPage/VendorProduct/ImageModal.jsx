import React, { useState } from 'react';
import Compressor from 'compressorjs';

const ImageModal = ({ images, productId, onAddImage, onRemoveImage, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newImage, setNewImage] = useState('');
  const [newImageBlob, setNewImageBlob] = useState(null);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const compressImage = (file, quality, callback, convertToJPEG = false) => {
    new Compressor(file, {
      quality: quality,
      convertSize: Infinity, // Prevents auto conversion to JPEG
      mimeType: convertToJPEG ? 'image/jpeg' : file.type,
      success: (compressedResult) => {
        if (compressedResult.size / 1024 <= 20) {
          callback(compressedResult);
        } else if (quality > 0.1) {
          compressImage(file, quality - 0.1, callback, convertToJPEG); // Reduce quality and try again
        } else if (!convertToJPEG) {
          compressImage(file, 1.0, callback, true); // Convert to JPEG and try again
        } else {
          callback(compressedResult); // Use the lowest quality if size is still above 20KB
        }
      },
      error: (err) => {
        console.error('Image compression error:', err);
      },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, 1.0, (compressedResult) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImageBlob(reader.result.split(',')[1]); // Remove base64 prefix
          setNewImage(URL.createObjectURL(compressedResult));
        };
        reader.readAsDataURL(compressedResult);
      });
    }
  };

  const handleAddImage = () => {
    if (newImageBlob) {
      onAddImage(productId, newImage, newImageBlob);
      setNewImage('');
      setNewImageBlob(null);
    }
  };

  const handleRemoveImage = () => {
    const imageId = images[currentImageIndex].ProductImageID;
    onRemoveImage(imageId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-screen-md w-full h-screen/2" onClick={(e) => e.stopPropagation()}>
        {images.length > 0 && (
          <>
            <img
              src={images[currentImageIndex].ProductImageBlob
                ? `data:image/${images[currentImageIndex].mimeType || 'jpeg'};base64,${images[currentImageIndex].ProductImageBlob}`
                : ''}
              alt={images[currentImageIndex].ProductimageName}
              className="w-full h-full object-contain"
            />
            <div className="flex justify-between mt-4">
              <button onClick={handlePrev} className="btn btn-secondary">&lt; Prev</button>
              <button onClick={handleNext} className="btn btn-secondary">Next &gt;</button>
            </div>
          </>
        )}
        <div className="mt-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="input mb-2" />
          <button onClick={handleAddImage} className="btn btn-primary mr-2">Add Image</button>
          {images.length > 0 && (
            <button onClick={handleRemoveImage} className="btn btn-danger">Remove Current Image</button>
          )}
        </div>
        <button onClick={onClose} className="absolute top-0 right-0 m-4 bg-gray-300 p-2 rounded-full hover:bg-gray-400">&times;</button>
      </div>
    </div>
  );
};

export default ImageModal;
