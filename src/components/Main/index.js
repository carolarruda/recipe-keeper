import "./style.css";
import { useEffect, useState } from 'react'

const Main = ({ className }) => {

  const [recipe, setRecipe] = useState("")


  useEffect(() => {
    fetch('http://localhost:4000/recipes')
    .then(response => response.json())
    .then((data) => {
      setRecipe(data);
  })
  }, [])

  console.log('my data', recipe);

  return (
    <>
      <div className={className}>
        <h1> My Recipes</h1>
        <section className="card-grid">
        {recipe.length > 0 && (recipe.map(item => {
          return (
        <div style ={{ backgroundImage: `url(${item.photo})`}} >{item.title}</div>
          )
        }))}
          
        </section>
      </div>
    </>
  );
};

export default Main;
