import { useState } from "react";

export default function Setting() {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--box-color"
  );
  const [color, setColor] = useState(localStorage.getItem("color") || bgColor);

  const changeColor = (e) => {
    setColor(e.target.value);
    document.documentElement.style.setProperty("--box-color", e.target.value);
    localStorage.setItem("color", e.target.value); // Change the CSS variable's value
  };

  const setDefaultColor = () => {
    document.documentElement.style.setProperty("--box-color", "#E7E7EE");
    localStorage.setItem("color", "#E7E7EE");
    setColor("#E7E7EE");
  };

  return (
    <div>
      <h2 className="text-center " style={{ textDecoration: "underline" }}>
        {" "}
        Change Background Color{" "}
      </h2>
      <div className="d-flex justify-content-center">
        <div>
          <span className="fs-6 fw-bold mt-4">Select Color </span>
          <br></br>
          <input
            type="color"
            value={color}
            onChange={changeColor}
            style={{
              height: "70px",
              width: "100px",
              cursor: "pointer",
              // border: "5px solid red",
              boxShadow: "2px 1px 10px grey",
              padding: "0px",
            }}
          />
          <br></br>

          <span className="fs-6 fw-bold "> Set Default Color</span>
          <input
            type="checkbox"
            onClick={(e) => setDefaultColor(e.target.checked)}
            checked={color == "#E7E7EE"}
          />
        </div>
      </div>
    </div>
  );
}
