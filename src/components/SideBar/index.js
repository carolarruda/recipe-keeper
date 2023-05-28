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
      <Options />
      <form className="center-it form-style">
        <label></label>
        <input type="text" placeholder="🔍 Search recipes" />
      </form>
      <div className="grid-menu">
      <Plus />
      <Link to={"add-new-recipe"}>
        <a className="btn-add">Add new recipes</a>
      </Link>
      <HomeIcon />
      <Link to={"/"}>
        <a className="btn-add"> Home</a>
      </Link>
      <Like />

      <a className="btn-add">Favorites</a>
      <Settings />
      <a className="btn-add">Settings</a>
      </div>

    </div>
  );
};

export default SideBar;
