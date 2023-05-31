import "./App.css";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import {Routes, Route} from 'react-router-dom'
import NewRecipe from "./components/NewRecipe";
import RecipeView from "./components/RecipeView";
import { useEffect, useState } from 'react'



function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/recipes')
    .then(response => response.json())
    .then((data) => {
      setRecipes(data);
  })
  }, [])

  return (
    <div className="grid">
      <SideBar className="nav-container" />
      <Routes>
        <Route path='/'
        element={<Main className="main-container" recipes={recipes} setRecipes={setRecipes}/>}/>
        <Route path='/add-new-recipe'
        element={<NewRecipe setRecipes={setRecipes} recipes={recipes}/>}/>
        <Route path='/:id'
        element={<RecipeView recipes={recipes} />}/>
      </Routes>
     
    </div>
  );
}

export default App;
