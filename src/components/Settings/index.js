import { useState } from "react";
import "../styles/style.css";

const Settings = ({ className, handleTheme }) => {


  return (
    <>
      <div className={className} id="main-container-settings">
        <div className="settings-title">SETTINGS</div>
        <div className="theme-grid">
          <div>
            <div className="colors">THEME</div>
            <div className="colors">
              <button onClick={handleTheme} value={'rgb(233, 194, 237)'} className="color1 btn-no-style"></button>
              <button onClick={handleTheme} value={'rgb(248, 185, 40)'}className="color2 btn-no-style"></button>
              <button onClick={handleTheme} value={'rgb(158, 175, 245)'} className="color3 btn-no-style"></button>
              <button onClick={handleTheme} value={'rgb(197, 226, 231)'} className="color4 btn-no-style"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
