import "./App.css";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import {Routes, Route} from 'react-router-dom'
import NewRecipe from "./components/NewRecipe";



function App() {
  return (
    <div className="grid">
      <SideBar className="nav-container" />
      <Routes>
        <Route path='/'
        element={<Main className="main-container" />}/>
        <Route path='/add-new-recipe'
        element={<NewRecipe/>}/>


      </Routes>
     
    </div>
  );
}

export default App;
