import React, { useState } from "react";

function ColorPickerApp() {
  const [red, setRed] = useState("0");
  const [green, setGreen] = useState("0");
  const [blue, setBlue] = useState("0");

  return (
    <div className="flex justify-center items-center flex-col">
      <div
        style={{
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          width: 200,
          height: 200,
        }}
      ></div>
      <div className="border border-gray-200 my-2">
        <label>Red:</label>
        <input value={red} onChange={(e) => setRed(e?.target?.value)} />
      </div>
      <div className="border border-gray-200 my-2">
        <label>Green:</label>
        <input value={green} onChange={(e) => setGreen(e?.target?.value)} />
      </div>
      <div className="border border-gray-200 my-2">
        <label>Blue:</label>
        <input value={blue} onChange={(e) => setBlue(e?.target?.value)} />
      </div>
      <p>
        RGB: {red}, {green}, {blue}
      </p>
    </div>
  );
}

export default ColorPickerApp;
