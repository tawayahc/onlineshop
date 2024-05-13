import React, { useState } from "react";
// import DynamicBounds from "./DynamicBounds";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function DualSlider() {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [step, setStep] = useState(1); // Optional step control

  const handleChange = (newValue) => {
    setPriceRange({ min: newValue[0], max: newValue[1] });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = Math.max(0, Math.min(100, +value || 0)); // Ensure valid range
    setPriceRange((prevState) => ({
      ...prevState,
      [name]: parsedValue,
    }));
  };

  const handleMinChange = (e) => {
    const newMin = Math.max(0, +e.target.value || 0); // Ensure non-negative
    setPriceRange((prevState) => ({
      ...prevState,
      min: Math.min(newMin, prevState.max - 5), // Maintain minimum gap of 5
    }));
  };

  const handleMaxChange = (e) => {
    const newMax = Math.min(100, +e.target.value || 100); // Ensure max <= 100
    setPriceRange((prevState) => ({
      ...prevState,
      max: Math.max(newMax, prevState.min + 5), // Maintain minimum gap of 5
    }));
  };

  const handleStepChange = (e) => {
    setStep(+e.target.value || 1);
  };

  const formatValue = (value) => (value < 10 ? `0${value}` : value.toString());
  return (
    <div>
      <div className="form-control col-span-2">
        <label className="label justify-center font-semibold">ช่วงราคา</label>
        <Slider
          range
          step={1}
          allowCross={true}
          // pushable={10}
          min={0}
          max={100}
          value={[priceRange.min, priceRange.max]}
          onChange={handleChange}
          styles={{
            track: {
              backgroundColor: "#2F84FF",
              height: "10px",
            },
            handle: {
              backgroundColor: "white",
              opacity: 1,
              border: "2px solid #2F84FF",
              height: "20px",
              width: "20px",
            },
            rail: {
              height: "10px",
            },
          }}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="form-control">
            <label className="label">ราคาต่ำสุด</label>
            <input
              type="number"
              name="min"
              value={formatValue(priceRange.min)}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label">ราคาสูงสุด</label>
            <input
              type="number"
              name="max"
              value={formatValue(priceRange.max)}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DualSlider;