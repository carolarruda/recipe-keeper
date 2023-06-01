import "./App.css";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Favorites from "./components/Favourites";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import RecipeView from "./components/RecipeView";
import { useEffect, useState } from "react";
import EditRecipe from "./components/EditRecipe";


function App() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHoverIn = (index) => {
    setHoveredCard(index);
  };

  const handleHoverOut = () => {
    setHoveredCard(null);
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
            navigate('/')
          });
      });
  };

  return (
    <div className="grid">
      <SideBar className="nav-container" />
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
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              className="main-container"
              recipes={recipes}
              setRecipes={setRecipes}
              hoveredCard={hoveredCard}
              handleHoverIn={handleHoverIn}
              handleHoverOut={handleHoverOut}
              handleDelete={handleDelete}
            />
          }
        />
        <Route
          path="/add-new-recipe"
          element={<NewRecipe setRecipes={setRecipes} recipes={recipes} />}
        />
        <Route path="/:id" element={<RecipeView recipes={recipes} setRecipes={setRecipes} handleDelete={handleDelete} />} />
        <Route path="favorites/:id" element={<RecipeView recipes={recipes} setRecipes={setRecipes} handleDelete={handleDelete} />} />
        <Route
          path="/recipes/edit/:id"
          element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route
          path="/:id/recipes/edit/:id"
          element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />}
        />
      </Routes>
    </div>
  );
}

export default App;
