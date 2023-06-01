import "./style.css";
import { Link } from "react-router-dom";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import LikeRed from "../icons/likeRed";
import { useEffect, useState } from "react";
import Plus from "../icons/plus";

const Settings = ({ className }) => {
  return (
    <>
      <div className={className} id="main-container-settings">
        <div className="settings-title">SETTINGS</div>
        <div className="theme-grid">
          <div className="colors">THEME</div>
          <div className="colors">
            <button className="lavender btn-no-style"></button>
            <button className="orange btn-no-style"></button>
            <button className="blue btn-no-style"></button>
            <button className="default btn-no-style"></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
