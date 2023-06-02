import "../styles/style.css";
import { Link } from "react-router-dom";

const BrowseRecipes = ({
  className,
  meals,
  hoveredCard,
  handleHoverIn,
  handleHoverOut,
  theme,
  handleSearchApi
}) => {
  return (
    <>
      <div className={className}>
        <div></div>
        <section className="card-grid" >
          {!meals && <h1>Sorry, No recipes found</h1>}
          {meals &&
            meals.length > 0 &&
            meals.map((item, index) => {
              const isHovered = hoveredCard === index;
              const boxstyle = {
                backgroundImage: `url(${item.strMealThumb})`,
                filter: isHovered
                  ? "brightness(95%)"
                  : "blur(1px) brightness(90%) grayscale(30%)",
              };
              const cardBox = {
                backgroundColor: isHovered ? `${theme}` : "#d8dfe6",
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                transition:
                  "background-color 0.3s, border-bottom 0.3s, transform 0.3s",
              };

              const styleForphoto = {
                textDecoration: "none",
                color: "#808080",
                display: "grid",
                textAlign: "left",
                paddingLeft: "5px",
              };

              return (
                <div
                  className="box"
                  style={cardBox}
                  onMouseEnter={() => handleHoverIn(index)}
                  onMouseLeave={handleHoverOut}
                  key={item.idMeal}
                >
                  <div className="icons-container"></div>

                  <Link to={`${item.strYoutube}`} style={styleForphoto}>
                    <div className="recipe-photo" style={boxstyle}></div>
                  </Link>
                  <div className="recipe-name">{item.strMeal}</div>
                </div>
              );
            })}
        </section>
      <button className="remove btn-api" onClick={handleSearchApi}>Search recipes</button>
      </div>
    </>
  );
};

export default BrowseRecipes;
