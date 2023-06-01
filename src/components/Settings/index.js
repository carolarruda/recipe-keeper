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
              <button onClick={handleTheme} value={'lavender'} className="color1 btn-no-style"></button>
              <button onClick={handleTheme} value={'orange'}className="color2 btn-no-style"></button>
              <button onClick={handleTheme} value={'blue'} className="color3 btn-no-style"></button>
              <button onClick={handleTheme} value={'default'} className="color4 btn-no-style"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
