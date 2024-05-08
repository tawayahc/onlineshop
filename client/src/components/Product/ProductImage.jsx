import React, { useState } from 'react';

const ProductImage = ({ thumbnailImages }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnailImages[0]);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col md:w-[450px]">
    <div id="main" className="mb-4">
      <img
        src={selectedImage}
        alt="Shoes"
        className="rounded-xl max-w-full cursor-pointer"
        onClick={() => handleClick(thumbnailImages[0])} 
      />
    </div>
    <div className="flex flex-row mt-3 overflow-x-auto md:overflow-x-visible justify-evenly">
      {thumbnailImages.map((image, index) => (
        <picture key={index} className="w-24 h-24">
          <img
            src={image}
            alt={`Shoes Thumbnail ${index + 1}`}
            className={`rounded-xl cursor-pointer ${selectedImage === image ? 'border-4 border-blue-500' : 'opacity-50'}`} 
            onClick={() => handleClick(image)}
          />
        </picture>
      ))}
    </div>
  </div>
  );
};

export default ProductImage;
