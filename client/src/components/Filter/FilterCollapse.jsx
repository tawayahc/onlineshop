import React, { useState, useEffect } from "react";

function FilterCollapse({ title, type, data, onFilterChange }) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });

  // Function to handle price range change
  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
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
  // WARN : Fetch data from database or client side
  // NOTE: Fetch data from database (is this neccesary?)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('your-api-endpoint');
  //     const data = await response.json();
  //   };

  //   fetchData();
  // }, []);

  const content = () => {
    switch (type) {
      case "category":
      case "brands":
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
                <div className="ml-2">{item}</div>
              </div>
            ))}
          </div>
        );
        //FIX: Change Slider
      case "price":
        return (
          <div className="grid grid-cols-2 gap-2">
            <div className="form-control">
              <label className="label">ราคาต่ำสุด</label>
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceRangeChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">ราคาสูงสุด</label>
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceRangeChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control col-span-2">
              <label className="label">Range</label>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="range range-primary range-sm"
              />
            </div>
          </div>
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
