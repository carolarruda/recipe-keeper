import { useParams } from "react-router-dom";
import "../styles/style.css";
import Serving from "../icons/serving";
import Clock from "../icons/clock";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import Pdf from "../icons/pdf";
import { Link } from "react-router-dom";
import * as React from 'react';
import html2pdf from "html2pdf.js";
import { useRef } from "react";

const RecipeView = ({ recipes, setRecipes, handleDeleteRecipe, hoveredCard, theme }) => {
  const params = useParams();
  const containerRef = useRef(null);

  const handleDownload = (e) => {
    const containerElement = containerRef.current;
  
    const pageWidth = containerElement.offsetWidth;
    const pageHeight = containerElement.offsetHeight;
  
    const clonedContainer = containerElement.cloneNode(true);

    const buttons = clonedContainer.querySelectorAll(".icons-container button");
    buttons.forEach((button) => {
      button.parentNode.removeChild(button);
    });
  
    const editLink = clonedContainer.querySelector(`a[href*="recipes/edit/"]`);
    if (editLink) {
      editLink.parentNode.removeChild(editLink);
    }
  
    html2pdf()
      .set({
        margin: 0,
        filename: "recipe.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, logging: true },
        jsPDF: { unit: "px", format: [pageWidth, pageHeight], orientation: "portrait" },
      })
      .from(clonedContainer)
      .save();
  };
  
  
  

  const calcTime = () => {
    const recipe = recipes.find((recipe) => recipe.id.toString() === params.id);

    if (!recipe) {
      return "";
    }

    if (recipe.prep === "" && recipe.cook === "") {
      return "";
    }

    const [prepHours, prepMinutes] = recipe.prep.split(":").map(Number);
    const [cookHours, cookMinutes] = recipe.cook.split(":").map(Number);
 
    let totalMinutes =
      prepHours * 60 + prepMinutes + cookHours * 60 + cookMinutes;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="grid-container" ref={containerRef}>

      {recipes.map(
        (recipe, index) => {
          if(recipe.id.toString() === `${params.id}`) {

          return (
            <React.Fragment key={`${recipe.id}`} >
              <section 
                key={Math.random()} 
                className="content"
                style={{ backgroundImage: `url(${recipe.photo})` }}
              >
                   <div className="icons-container margin-add">
                   <button
                    onClick={handleDownload}
                    className="btn-no-style"
                    value={`${recipe.name}`} 
                    style={{marginRight: "10px"}} 
                    
                  >
                    <Pdf fill={theme} />
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="btn-no-style"
                    style={{marginRight: "10px"}} 
                  
                  >
                    <Delete fill={theme} />
                  </button>
                  <Link to={`recipes/edit/${recipe.id}`}  style={{marginRight: "10px"}}   >
                    <Edit fill={theme}/>
                  </Link>
                </div>
              </section>
              <section className="top">
                <div className="title">{recipe.title}</div>
                <div className="subtitle"></div>
                <div className="right-side">
                  <div className="score">
                    <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    ></link>
                    {(recipe.rating === "" || recipe.rating === "0") && (
                      <>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </>
                    )}
                    {recipe.rating === "1" && (
                      <>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </>
                    )}
                    {recipe.rating === "2" && (
                      <>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </>
                    )}
                    {recipe.rating === "3" && (
                      <>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                        <span className="fa fa-star"></span>
                      </>
                    )}
                    {recipe.rating === "4" && (
                      <>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star"></span>
                      </>
                    )}
                    {recipe.rating === "5" && (
                      <>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                        <span className="fa fa-star checked"></span>
                      </>
                    )}
                  </div>
                  <div className="servings">
                    <Serving />
                    <div className="number">{recipe.servings}</div>
                  </div>
                  <div className="time">
                    <Clock />
                    <div className="number">{calcTime()}</div>
                  </div>
                </div>
              </section>
              <section className="left">
                <h1>Ingredients</h1>
                <br />
                <ul>
                  {recipe.ingredients.split("\n").map(
                    (line, index) =>
                      line.length > 0 && (
                        <li key={index} className="ingredients">
                          {line}
                        </li>
                      )
                  )}
                </ul>
                <br />
                <h1>Notes</h1>
                <br />
                <ul style={{ listStyleType: "none" }}>
                  {recipe.notes.split("\n").map(
                    (line, index) =>
                      line.length > 0 && (
                        <li key={index} className="ingredients notes">
                          {line}
                        </li>
                      )
                  )}
                </ul>
              </section>
              <section className="right" >
                <h1>Instructions</h1>
                <br />
                <ol>
                  {recipe.instructions.split("\n").map(
                    (line, index) =>
                      line.length > 0 && (
                        <li className="ingredients instructions" key={index}>
                          {line}
                        </li>
                      )
                  )}
                </ol>
              </section>
              <section className="bottom"></section>
            </React.Fragment>
          )
        }
      } 
      )}
    </div>
  );
};

export default RecipeView;
