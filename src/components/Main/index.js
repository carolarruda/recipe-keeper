import "../styles/style.css";
import { Link } from "react-router-dom";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import Heart from "../icons/heart";
import LikeRed from "../icons/likeRed";
import { useState } from "react";

const Main = ({
  className,
  recipes,
  setRecipes,
  hoveredCard,
  handleHoverIn,
  handleHoverOut,
  handleDelete,
  theme,
  search,
  handleSearchApi,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const likeRecipe = (id) => {
    const likedRecipe = recipes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
        };
      } else {
        return item;
      }
    });

    setRecipes(likedRecipe);

    const isRecipeLiked =
      likedRecipe.find((item) => item.id === id)?.liked || false;
    setIsLiked(isRecipeLiked);

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
      fetch(`http://localhost:4000/recipes/${id}`, optLike)
        .then((response) => response.json())
        .then(() => {
          fetch("http://localhost:4000/recipes")
            .then((response) => response.json())
            .then((data) => {
              setRecipes(data);
              setIsLiked(true);
            });
        });
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={className} id="main-container-new">
        <div className="favourite-title">YOUR RECIPES</div>
        <section className="card-grid">
          {filteredRecipes.length > 0 &&
            filteredRecipes.map((item, index) => {
              const isHovered = hoveredCard === index;
              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
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
                    <Link
                      to={`recipes/edit/${item.id}`}
                      className="btn-no-style-test"
                    >
                      <Edit show={show} />
                    </Link>
                    <button
                      onClick={() => likeRecipe(item.id)}
                      className="btn-no-style"
                    >
                      {!item.liked && <Heart show={show} />}
                      {item.liked && <LikeRed showRed={showRed} />}
                    </button>
                  </div>

                  <Link to={`${item.id}`} style={styleForphoto}>
                    <div className="recipe-photo" style={boxstyle}></div>
                  </Link>
                  <div className="recipe-name">{item.title}</div>
                </div>
              );
            })}
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            <button className="remove btn-api" onClick={handleSearchApi}>
              Search recipes
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Main;
