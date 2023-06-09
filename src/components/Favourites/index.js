import "../styles/style.css";
import { Link } from "react-router-dom";
import Delete from "../icons/delete";
import Edit from "../icons/edit";
import LikeRed from "../icons/likeRed";
import { useEffect, useState } from "react";
import Plus from "../icons/plus";

const Favourites = ({
  className,
  recipes,
  setRecipes,
  hoveredCard,
  hoveredCardTwo,
  handleHoverIn,
  handleHoverOut,
  handleDelete,
  websites,
  setWebsites,
  theme,
  search,
}) => {
  const [isLiked, setIsLiked] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let forMobile = 550;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/websites")
      .then((response) => response.json())
      .then((data) => {
        setWebsites(data);
      });
  }, [setWebsites]);

  const likeRecipe = (id) => {
    const likedRecipe = recipes.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          liked: false,
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

      fetch(url, optLike).then((response) => response.json());
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
      fetch(url, optLike).then((response) => response.json());
    }
  };

  const handleDeleteWeb = (id) => {
    const opts = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/websites/${id}`, opts)
      .then((response) => response.json())
      .then(() => {
        fetch("http://localhost:4000/websites")
          .then((res) => res.json())
          .then((data) => {
            setWebsites(data);
          });
      });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className={className} id="main-container-favourite">
        <div className="favourite-title">FAVOURITE RECIPES</div>
        <section className="card-grid">
          {filteredRecipes.length > 0 &&
            filteredRecipes.map((item, id) => {
              const isHovered = hoveredCard === id;

              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
                filter:
                  isHovered || windowWidth <= 500
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
                fill:
                  isHovered || windowWidth <= `${forMobile}`
                    ? "#30505b"
                    : "transparent",
                width: windowWidth <= `${forMobile}` ? "22px" : "30px",
                padding: "3px",
                display: "grid",
                justifyContent: "center",
              };
              const showRed = {
                fill:
                  isHovered || windowWidth <= `${forMobile}`
                    ? "rgb(185, 14, 10)"
                    : "transparent",
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
              if (item.liked) {
                return (
                  <div
                    className="box"
                    style={cardBox}
                    onMouseEnter={() => handleHoverIn(id, false)}
                    onMouseLeave={() => handleHoverOut(false)}
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
                        <LikeRed showRed={showRed} />
                      </button>
                    </div>

                    <Link to={`${item.id}`} style={styleForphoto}>
                      <div className="recipe-photo" style={boxstyle}></div>
                    </Link>
                    <div className="recipe-name">{item.title}</div>
                  </div>
                )
              }
              else {
                return null; 
              }
             
            })}
        </section>
        <div className="favourite-title">
          FAVOURITE WEBSITES
          <Link to={"/add-new-website"}>
            <button className="btn-no-style add-btn-website">
              <Plus width={"15px"} /> Add new Website
            </button>
          </Link>
        </div>
        <section className="card-grid">
          {websites.length > 0 &&
            websites.map((website, index) => {
              const isHoveredTwo = hoveredCardTwo === index;
              const boxstyle = {
                backgroundImage: `url(${website.image})`,
                filter:
                  isHoveredTwo || windowWidth <= 500
                    ? "brightness(95%)"
                    : "blur(1px) brightness(90%) grayscale(30%)",
                // minHeight: isHovered ? "280px" : "275px",
                // minWidth: isHovered ? "300px" : "295px",
              };
              const cardBox = {
                backgroundColor: isHoveredTwo ? `${theme}` : "#d8dfe6",
                // borderBottom: isHovered ? "3px solid #9ecdd4" : "3px solid transparent",
                transform: isHoveredTwo
                  ? "translateY(-5px)"
                  : "translateY(0px)",
                transition:
                  "background-color 0.3s, border-bottom 0.3s, transform 0.3s",
              };

              const show = {
                fill:
                  isHoveredTwo || windowWidth <= 500
                    ? "#30505b"
                    : "transparent",
                width: windowWidth <= 500 ? "22px" : "30px",
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
                  className="box test"
                  style={cardBox}
                  onMouseEnter={() => handleHoverIn(index, true)}
                  onMouseLeave={() => handleHoverOut(true)}
                  key={website.id}
                >
                  <div className="icons-container">
                    <button
                      onClick={() => handleDeleteWeb(website.id)}
                      className="btn-no-style"
                    >
                      <Delete show={show} />
                    </button>
                    <Link to={`websites/edit/${website.id}`}>
                      <Edit show={show} />
                    </Link>
                    <button
                      onClick={() => likeRecipe(website.id)}
                      className="btn-no-style"
                    ></button>
                  </div>

                  <Link to={`${website.url}`} style={styleForphoto}>
                    <div
                      className="recipe-photo"
                      id="remove-border-radius"
                      style={boxstyle}
                    ></div>
                  </Link>
                  <div className="recipe-name">{website.name}</div>
                </div>
              );
            })}
        </section>
      </div>
    </>
  );
};

export default Favourites;
