import React, { useState } from 'react';

const ImageInput = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');

    const handleImageUrlChange = (e) => {
      setImageUrl(e.target.value);
    };

    const displayImage = () => {
      setImage(imageUrl);
    };

    return (
      <div>
        <input type="url" value={imageUrl} onChange={handleImageUrlChange} className="input mb-2" placeholder="Enter image URL" />
        <button onClick={displayImage} className="input mb-2">Display Image</button>
        {image && (
          <div className="mt-2">
            <img src={image} alt="Displayed" className="w-24 h-24 mr-2" />
          </div>
        )}
      </div>
    );
  };

export default ImageInput;