import "../styles/style.css";
import { Link } from "react-router-dom";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import Heart from "../icons/heart";
import LikeRed from "../icons/likeRed";
import { useState, useEffect } from "react";

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
  const [isLiked, setIsLiked] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let forMobile = 550

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={className} id="main-container-new">
        <div className="favourite-title">YOUR RECIPES</div>
        <section className="card-grid">
        {filteredRecipes.length === 0 && <h1>Sorry, No recipes found</h1>}
          {filteredRecipes.length > 0 &&
            filteredRecipes.map((item, index) => {
              const isHovered = hoveredCard === index;
              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
                filter: isHovered || windowWidth <= `${forMobile}` 
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
                fill: isHovered || windowWidth <= `${forMobile}` ? "#30505b" : "transparent",
                width: windowWidth <= `${forMobile}` ? "22px" : "30px",
                padding: "3px",
                display: "grid",
                justifyContent: "center",
              };
              const showRed = {
                fill: isHovered || windowWidth <= `${forMobile}`  ? "rgb(185, 14, 10)" : "transparent",
                width: windowWidth <= `${forMobile}` ? "22px" : "30px",
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
