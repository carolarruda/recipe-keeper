import "./style.css";
import Options from "../icons/options";
import Plus from "../icons/plus";
import HomeIcon from "../icons/homeIcon";
import Like from "../icons/like";
import Settings from "../icons/settings";

import { Link } from "react-router-dom";

const SideBar = ({ className }) => {
  return (
    <div className={className}>
      <button className="options-icon remove">
      <Options />
      </button>
     
      <form className="center-it form-style">
        <label></label>
        <input type="text" placeholder="🔍 Search recipes" />
      </form>
      <div className="grid-menu">
        <Link to={"add-new-recipe"} style={{ textDecoration: "none" }}>
          <div className="grid-menu-two btn-add">
            <Plus />
            <button className="remove">Add new recipes</button>
          </div>
        </Link>

        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="grid-menu-two btn-add">
            <HomeIcon />
            <button className="remove"> Home</button>
          </div>
        </Link>

        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="grid-menu-two btn-add">
            <Like />
            <button className="remove">Favorites</button>
          </div>
        </Link>
        
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div className="grid-menu-two btn-add">
          <Settings />
            <button className="remove">Settings</button>
          </div>
        </Link>


      </div>
    </div>
  );
};

export default SideBar;
