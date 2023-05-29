import "./style.css";
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

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
        <div></div>
        <section className="card-grid">
        {recipe.length > 0 && (recipe.map(item => {
          return (
        <Link to={item.title.toLowerCase().replaceAll(' ', '')} style={{textDecoration: "none"}}><div style ={{ backgroundImage: `url(${item.photo})`}} >{item.title}</div></Link>
          )
        }))}
          
        </section>
      </div>
    </>
  );
};

export default Main;
