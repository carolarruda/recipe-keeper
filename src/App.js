import "./App.css";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Favourites from "./components/Favourites";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import RecipeView from "./components/RecipeView";
import { useEffect, useState } from "react";
import EditRecipe from "./components/EditRecipe";
import NewWebsite from "./components/NewWebsite";
import EditWebsite from "./components/EditWebsite";
import Settings from "./components/Settings";

function App() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [theme, setTheme] = useState(() => {
    const localValue = localStorage.getItem("THEME");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const handleTheme = (e) => {
    console.log(e.target.value);
    setTheme(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/websites")
      .then((response) => response.json())
      .then((data) => {
        setWebsites(data);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("THEME", JSON.stringify(theme));
  }, [theme]);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCardTwo, setHoveredCardTwo] = useState(null);

  const handleHoverIn = (index, isSecondCard) => {
    if (isSecondCard) {
      setHoveredCardTwo(index);
    } else {
      setHoveredCard(index);
    }
  };

  const handleHoverOut = (isSecondCard) => {
    if (isSecondCard) {
      setHoveredCardTwo(null);
    } else {
      setHoveredCard(null);
    }
  };

  const handleDelete = (id) => {
    const filteredRecipes = recipes.filter((recipe) => {
      if (recipe.id !== id) {
        return recipe;
      }
    });
    setRecipes(filteredRecipes);

    const opts = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/recipes/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/recipes")
          .then((res) => res.json())
          .then((data) => {
            setRecipes(data);
          });
      });
  };

  const handleDeleteRecipe = (id) => {
    const filteredRecipes = recipes.filter((recipe) => {
      if (recipe.id !== id) {
        return recipe;
      }
    });
    setRecipes(filteredRecipes);

    const opts = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/recipes/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/recipes")
          .then((res) => res.json())
          .then((data) => {
            setRecipes(data);
            navigate(-1);
          });
      });
  };

  const handleDeleteWeb = (id) => {
    const filteredWebsites = websites.find((website) => {
      if (website.id !== id) {
        return website;
      }
    });
    setWebsites(filteredWebsites);

    const opts = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/websites/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/websites")
          .then((res) => res.json())
          .then((data) => {
            setWebsites(data);
          });
      });
  };



  return (
    <div className="grid">
      <SideBar className="nav-container" theme={theme} />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              className="main-container"
              recipes={recipes}
              setRecipes={setRecipes}
              hoveredCard={hoveredCard}
              handleHoverIn={handleHoverIn}
              handleHoverOut={handleHoverOut}
              handleDelete={handleDelete}
              theme={theme}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              className="main-container"
              recipes={recipes}
              setRecipes={setRecipes}
              handleHoverIn={handleHoverIn}
              handleHoverOut={handleHoverOut}
              handleDelete={handleDelete}
              hoveredCard={hoveredCard}
              hoveredCardTwo={hoveredCardTwo}
              setWebsites={setWebsites}
              websites={websites}
              theme={theme}
            />
          }
        />
        <Route
          path="/add-new-recipe"
          element={<NewRecipe setRecipes={setRecipes} recipes={recipes} />}
        />
        <Route
          path="/add-new-website"
          element={<NewWebsite setWebsites={setWebsites} websites={websites} />}
        />
        <Route
          path="/:id"
          element={
            <RecipeView
              recipes={recipes}
              setRecipes={setRecipes}
              handleDelete={handleDelete}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          }
        />
        <Route
          path="favourites/:id"
          element={
            <RecipeView
              recipes={recipes}
              setRecipes={setRecipes}
              handleDelete={handleDelete}
              handleDeleteWeb={handleDeleteWeb}
              handleDeleteRecipe={handleDeleteRecipe}
            />
          }
        />
        <Route
          path="/recipes/edit/:id"
          element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route
          path="/:id/recipes/edit/:id"
          element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route
          path="/favourites/:id/recipes/edit/:id"
          element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route
          path="/favourites/websites/edit/:id"
          element={
            <EditWebsite websites={websites} setWebsites={setWebsites} />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings className="main-container" handleTheme={handleTheme} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
