import { useState } from "react";

export default function Setting() {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--box-color"
  );
  const [color, setColor] = useState(bgColor);

  const changeColor = (e) => {
    setColor(e.target.value);
    document.documentElement.style.setProperty("--box-color", e.target.value); // Change the CSS variable's value
  };

  return (
    <div>
      <h5> Change Background Color </h5>
      Current Color:{" "}
      <input
        type="color"
        value={color}
        onChange={changeColor}
        style={{ height: "80px", width: "100px", cursor: "pointer" }}
      />
    </div>
  );
}
