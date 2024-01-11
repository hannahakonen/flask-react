import React from "react";

function WidthSlider({ sliderValue, setSliderValue }) {
  return (
    <div>
      <label htmlFor="width-slider" style={{ fontSize: "14px" }}>
        Width
      </label>
      <input
        id="width-slider"
        type="range"
        min="1"
        max="70"
        value={sliderValue}
        onChange={(event) => setSliderValue(event.target.value)}
      />
    </div>
  );
}

export default WidthSlider;