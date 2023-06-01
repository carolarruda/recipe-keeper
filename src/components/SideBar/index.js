import "../styles/style.css";
import Options from "../icons/options";
import Plus from "../icons/plus";
import HomeIcon from "../icons/homeIcon";
import Like from "../icons/like";
import Settings from "../icons/settings";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const SideBar = ({ className, theme, setRecipes, recipes, search, handleSearch }) => {
  const [setings, setSettings] = useState("#64648C");
  const [home, setHome] = useState("#64648C");
  const [favorites, setFavorites] = useState("#64648C");
  const [add, setAdd] = useState("#64648C");

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className={className} style={{ backgroundColor: theme }}>
      <button className="options-icon remove">
        <Options />
      </button>

      <form className="center-it form-style" onSubmit={handleSubmit}>
        <label htmlFor="search-online"></label>
        <input id="search-online" type="text" placeholder="Search recipes" value={search} onChange={handleSearch}/>
      </form>
      <div className="grid-menu">
        <Link to={"add-new-recipe"} style={{ textDecoration: "none" }}>
          <div
            className="grid-menu-two btn-add"
            onMouseEnter={() => setAdd("white")}
            onMouseLeave={() => setAdd("#64648C")}
          >
            <Plus fill={add} width={"20px"} />
            <button className="remove">Add new recipes</button>
          </div>
        </Link>

        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div
            className="grid-menu-two btn-add"
            onMouseEnter={() => setHome("white")}
            onMouseLeave={() => setHome("#64648C")}
          >
            <HomeIcon fill={home} />
            <button className="remove"> Home</button>
          </div>
        </Link>

        <Link to={"/favourites"} style={{ textDecoration: "none" }}>
          <div
            className="grid-menu-two btn-add"
            onMouseEnter={() => setFavorites("white")}
            onMouseLeave={() => setFavorites("#64648C")}
          >
            <Like fill={favorites} />
            <button className="remove">Favourites</button>
          </div>
        </Link>

        <Link to={"/settings"} style={{ textDecoration: "none" }}>
          <div
            className="grid-menu-two btn-add"
            onMouseEnter={() => setSettings("white")}
            onMouseLeave={() => setSettings("#64648C")}
          >
            <Settings fill={setings} />
            <button className="remove">Settings</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
