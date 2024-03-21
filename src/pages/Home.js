import React, { useState } from "react";
import "./Home.css";
import TextBox from "../components/Textbox";

function Home() {
  const [showTextBox, setShowTextBox] = useState(false);

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  return (
    <div>
      {showTextBox && <TextBox onClose={toggleTextBox} />}
      <div className={`overlay ${showTextBox ? 'overlay-blur' : ''}`}>
        <nav>
          <h3>View Audience</h3>
        </nav>
        <button className="segment-btn" onClick={toggleTextBox}>
          Save Segment
        </button>
      </div>
    </div>
  );
}

export default Home;
