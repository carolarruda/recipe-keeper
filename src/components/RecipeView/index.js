import { useParams } from "react-router-dom";
import "./style.css";
import Serving from "../icons/serving";
import Clock from "../icons/clock";

const RecipeView = ({ recipes }) => {
  const params = useParams();

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
    <div className="grid-container">
      {recipes.map(
        (recipe) =>
          recipe.id.toString() === `${params.id}` && (
            <>
              <section
                key={recipes.id}
                className="content"
                style={{ backgroundImage: `url(${recipe.photo})` }}
              >
                content
              </section>
              <section className="top" key={recipes.id}>
                <div className="title">{recipe.title}</div>
                <div className="subtitle"></div>
                <div className="right-side">
                  <div className="rating">
                    <link
                      rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                    ></link>
                    {(recipe.rating === "" || recipe.rating === "0") && (
                      <>
                        <span classNameName="fa fa-star"></span>
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
              <section className="left" key={recipes.id}>
                left
              </section>
              <section className="right" key={recipes.id}>
                right
              </section>
              <section className="bottom" key={recipes.id}>
                bottom
              </section>
              {/* <h1>{recipe.title}</h1>
              <ol>
                {recipe.instructions.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ol> */}
            </>
          )
      )}
    </div>
  );
};

export default RecipeView;
