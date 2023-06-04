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
import BrowseRecipes from "./components/BrowseRecipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCardTwo, setHoveredCardTwo] = useState(null);
  const [isLiked, setIsLiked] = useState('');
  
  const [theme, setTheme] = useState(() => {
    const localValue = localStorage.getItem("THEME");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const handleTheme = (e) => {
    setTheme(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
      fetch("http://localhost:4000/websites")
      .then((response) => response.json())
      .then((data) => {
        setWebsites(data);
      });
  }, []);



  useEffect(() => {
    localStorage.setItem("THEME", JSON.stringify(theme));
  }, [theme]);

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
    return(
      fetch(`http://localhost:4000/recipes/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/recipes")
          .then((res) => res.json())
          .then((data) => {
            setRecipes(data);
          });
      })
    )

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
    return(
      fetch(`http://localhost:4000/recipes/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/recipes")
          .then((res) => res.json())
          .then((data) => {
            setRecipes(data);
            navigate(-1);
          });
      })
    )

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
    return(
      fetch(`http://localhost:4000/websites/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/websites")
          .then((res) => res.json())
          .then((data) => {
            setWebsites(data);
          });
      })
    )

  };

  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      });
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (searchTerm.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredRecipes(filteredRecipes);
    }
  };

  const [meals, setMeals] = useState([]);

  const handleSearchApi = () => {
    console.log("my search", search);

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMeals(data.meals);
      });
  };

  const likeRecipe = (id) => {
    
    const likedRecipe = recipes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          liked: false,
        };
      } else {
        return item;
      }
    });

    setRecipes(likedRecipe);

    const isRecipeLiked =
      likedRecipe.find((item) => item.id === id)?.liked || false;
    setIsLiked(isRecipeLiked);


    const url = `http://localhost:4000/recipes/${id}`;

    if (isLiked) {
      const dislike = {
        liked: false,
      };

      const optLike = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dislike),
      };

     

      fetch(url, optLike)
        .then((response) => response.json())

    } else {
      const LikedRecipe = {
        liked: true,
      };

      const optLike = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LikedRecipe),
      };
      fetch(url, optLike)
        .then((response) => response.json())


    }
  };

  return (
    <div className="grid">
      <SideBar
        className="nav-container"
        theme={theme}
        setRecipes={setRecipes}
        recipes={recipes}
        handleSearch={handleSearch}
        search={search}
        handleSearchApi={handleSearchApi}
      />
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
              filteredRecipes={filteredRecipes}
              search={search}
              handleSearchApi={handleSearchApi}
              meals={meals}
              setMeals={setMeals}
              setIsLiked={setIsLiked}
              isLiked={isLiked}
              
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
              search={search}
              likeRecipe={likeRecipe}
              setIsLiked={setIsLiked}
              isLiked={isLiked}
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
              theme={theme}
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
              theme={theme}
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
        <Route
          path="/search"
          element={
            <BrowseRecipes
              className="main-container"
              meals={meals}
              setMeals={setMeals}
              hoveredCard={hoveredCard}
              handleHoverIn={handleHoverIn}
              handleHoverOut={handleHoverOut}
              theme={theme}
              handleSearchApi={handleSearchApi}
         
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
