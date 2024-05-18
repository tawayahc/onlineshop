import React, { useState, useEffect } from "react";
import DualSlider from "./DualSlider";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { selectedFiltersState } from "../../recoil/atom";
import axios from "axios";

function FilterCollapse({ title, type }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filters, setFilters] = useRecoilState(selectedFiltersState);
  const [categories, setCategories] = useState([]);
  const [rating] = useState([5, 4, 3, 2, 1]);
  
  //WARN: categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCategories([]);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: updatedValues,
    }));
  };
  const handleRatingChange = (newRating) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [newRating], // Since it's a radio button, only one rating can be selected at a time
    }));

    // Update the local state to reflect the selected value for the radio buttons
    setSelectedValues([newRating]);
  };

  const clearRatings = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      rating: [], 
    }));
    setSelectedValues([]); 
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) =>
      index < rating ? (
        <BsStarFill key={index} className="text-warning" />
      ) : (
        <BsStar key={index} className="text-gray-400" />
      )
    );
  };

  const content = () => {
    switch (type) {
      case "category":
        return (
          <div className="flex flex-wrap flex-col">
            {categories.map((item) => (
              <div key={item} className="flex cursor-pointer mr-2 mb-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checked:bg-primary"
                  checked={selectedValues.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <div className="ml-2">{item}</div>
              </div>
            ))}
          </div>
        );
      case "review":
        return (
          <div className="flex flex-wrap flex-col">
            {rating.map((item) => (
              <div key={item} className="form-control cursor-pointer mr-2 mb-2">
                <label className="flex items-center cursor-pointer ">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio"
                    checked={selectedValues.includes(item)}
                    onChange={() => handleRatingChange(item)}
                  />
                  <div className="flex flex-row ml-2">{renderStars(item)}</div>
                </label>
              </div>
            ))}
            <button
              className="btn btn-outline btn-accent btn-sm"
              onClick={clearRatings}
            >
              Clear
            </button>
          </div>
        );
      case "price":
        return <DualSlider />;
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
