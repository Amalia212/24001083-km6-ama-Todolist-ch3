import React, { useState } from "react";

function ColorPickerApp2() {
  const [red, setRed] = useState("0");
  const [green, setGreen] = useState("0");
  const [blue, setBlue] = useState("0");
  const [savedRed, setSavedRed] = useState("0");
  const [savedGreen, setSavedGreen] = useState("0");
  const [savedBlue, setSavedBlue] = useState("0");

  const handleSave = () => {
    if (parseInt(red) > 255 || parseInt(green) > 255 || parseInt(blue) > 255) {
      alert("Nilai tidak boleh lebih dari 255!");
    } else {
      setSavedRed(red);
      setSavedGreen(green);
      setSavedBlue(blue);
      setRed("0");
      setGreen("0");
      setBlue("0");
    }
  };

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
        <input value={red} onChange={(e) => setRed(e.target.value)} />
      </div>
      <div className="border border-gray-200 my-2">
        <label>Green:</label>
        <input value={green} onChange={(e) => setGreen(e.target.value)} />
      </div>
      <div className="border border-gray-200 my-2">
        <label>Blue:</label>
        <input value={blue} onChange={(e) => setBlue(e.target.value)} />
      </div>
      <button
        onClick={handleSave}
        className="border border-pink-500 bg-pink-500"
      >
        Simpan
      </button>
      <p>
        RGB: {red}, {green}, {blue}
      </p>
      <p>
        Disimpan: {savedRed}, {savedGreen}, {savedBlue}
      </p>
    </div>
  );
}

export default ColorPickerApp2;
