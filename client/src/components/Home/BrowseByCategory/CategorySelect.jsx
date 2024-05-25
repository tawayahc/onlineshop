import React from 'react';

const categories = ['All', 'Phones', 'Computers', 'SmartWatch', 'Camera', 'HeadPhones', 'Gaming'];

const CategorySelectSection = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex justify-center my-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`mx-2 px-4 py-2 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelectSection;
