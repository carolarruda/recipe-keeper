import "./style.css";
import { Link } from "react-router-dom";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import LikeRed from "../icons/likeRed";
import { useState } from "react";

const Favourites = ({
  className,
  recipes,
  setRecipes,
  hoveredCard,
  handleHoverIn,
  handleHoverOut,
  handleDelete,
}) => {
  const [isLiked, setIsLiked] = useState(true);

  const likeRecipe = (id) => {

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
      fetch(`http://localhost:4000/recipes/${id}`, optLike)
        .then((response) => response.json())
        .then(() => {
          fetch("http://localhost:4000/recipes")
            .then((response) => response.json())
            .then((data) => {
              setRecipes(data);
              setIsLiked(false);
            });
        });
  
  };
  return (
    <>
      <div className={className} id="main-container-favourite">
        <div className="favourite-title">My Favourites</div>
        <section className="card-grid">
          {recipes.length > 0 &&
            recipes.map((item, index) => {
              const isHovered = hoveredCard === index;
              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
                filter: isHovered
                  ? "brightness(95%)"
                  : "blur(1px) brightness(90%) grayscale(30%)",
                // minHeight: isHovered ? "280px" : "275px",
                // minWidth: isHovered ? "300px" : "295px",
              };
              const cardBox = {
                backgroundColor: isHovered ? "#c5e2e7" : "#d8dfe6",
                // borderBottom: isHovered ? "3px solid #9ecdd4" : "3px solid transparent",
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                transition:
                  "background-color 0.3s, border-bottom 0.3s, transform 0.3s",
              };

              const show = {
                fill: isHovered ? "#30505b" : "transparent",
                padding: "3px",
                display: "grid",
                justifyContent: "center",
              };
              const showRed = {
                fill: isHovered ? "red" : "transparent",
                padding: "3px",
                display: "grid",
                justifyContent: "center",
              };
              const styleForphoto = {
                textDecoration: "none",
                color: "#808080",
                display: "grid",
                textAlign: "left",
                paddingLeft: "5px",
              };

             
                if(item.liked){
                   return (
                  <div
                  className="box"
                  style={cardBox}
                  onMouseEnter={() => handleHoverIn(index)}
                  onMouseLeave={handleHoverOut}
                  key={item.id}
                >
                  <div className="icons-container">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn-no-style"
                    >
                      <Delete show={show} />
                    </button>
                    <Link to={`recipes/edit/${item.id}`}>
                      <Edit show={show} />
                    </Link>
                    <button
                      onClick={() => likeRecipe(item.id)}
                      className="btn-no-style"
                    >

                      <LikeRed showRed={showRed} />
                    </button>
                  </div>

                  <Link to={`${item.id}`} style={styleForphoto}>
                    <div className="recipe-photo" style={boxstyle}></div>
                  </Link>
                  <div className="recipe-name">{item.title}</div>
                </div>
                   );
                }               
               
              ;
            })}
        </section>
      </div>
    </>
  );
};

export default Favourites;
