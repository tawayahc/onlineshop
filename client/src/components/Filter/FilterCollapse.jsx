import React, { useState, useEffect } from "react";
import DualSlider from "./DualSlider";
import { BsStarFill, BsStar } from "react-icons/bs";

function FilterCollapse({ title, type, data, onFilterChange }) {
  const [selectedValues, setSelectedValues] = useState([]);

  // Function to handle checkbox toggle (category, brand, rating)
  const handleCheckboxChange = (value) => {
    const updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      updatedValues.splice(updatedValues.indexOf(value), 1);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
    onFilterChange(type, updatedValues);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = Math.max(0, 5 - fullStars);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <BsStarFill key={index} className="text-warning" />
        ))}

        {[...Array(emptyStars)].map((_, index) => (
          <BsStar
            key={index + fullStars }
            className="text-gray-400"
          />

        ))}
      </>
    )
  }

  const content = () => {
    switch (type) {
      case "category":
      case "brands":
        return (
          <div className="flex flex-wrap flex-col">
            {data.map((item) => (
              <div key={item} className="flex cursor-pointer mr-2 mb-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checked:bg-primary"
                  checked={selectedValues.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <div className="ml-2">
                  {item}
                </div>
              </div>
            ))}
          </div>
        );
        case "review":
          return (
            <div className="flex flex-wrap flex-col">
              {data.map((item) => (
                <div key={item} className="flex cursor-pointer mr-2 mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checked:bg-primary"
                    checked={selectedValues.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  <div className="flex flex-row ml-2">
                    {renderStars(item)}
                  </div>
                </div>

              ))}
            </div>
          )
      case "price":
        return (
          <DualSlider />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title font-bold font-noto">{title}</div>
        <div className="collapse-content">{content()}</div>
      </div>
    </div>
  );
}

export default FilterCollapse;
