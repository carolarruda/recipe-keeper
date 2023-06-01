import "./style.css";
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
}) => {

  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/websites")
      .then((response) => response.json())
      .then((data) => {
        setWebsites(data);
      });
  }, []);

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
  
const handleDeleteWeb = (id) => {
  const filteredWebsites = websites.find((website) => {
    if (website.id !== id) {
      return website;
    }
  });
  setWebsites(filteredWebsites);

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
}
  return (
    <>
      <div className={className} id="main-container-favourite">
        <div className="favourite-title">FAVOURITE RECIPES</div>
        <section className="card-grid">
          {recipes.length > 0 &&
            recipes.map((item, id) => {
              const isHovered = hoveredCard === id;
      
              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
                filter: isHovered
                  ? "brightness(95%)"
                  : "blur(1px) brightness(90%) grayscale(30%)",

              };
              const cardBox = {
                backgroundColor: isHovered ? "#c5e2e7" : "#d8dfe6",

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
                filter: isHoveredTwo
                  ? "brightness(95%)"
                  : "blur(1px) brightness(90%) grayscale(30%)",
                // minHeight: isHovered ? "280px" : "275px",
                // minWidth: isHovered ? "300px" : "295px",
              };
              const cardBox = {
                backgroundColor: isHoveredTwo ? "#c5e2e7" : "#d8dfe6",
                // borderBottom: isHovered ? "3px solid #9ecdd4" : "3px solid transparent",
                transform: isHoveredTwo ? "translateY(-5px)" : "translateY(0px)",
                transition:
                  "background-color 0.3s, border-bottom 0.3s, transform 0.3s",
              };

              const show = {
                fill: isHoveredTwo ? "#30505b" : "transparent",
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
                      >
                      </button>
                    </div>

                    <Link to={`${website.url}`} style={styleForphoto}>
                      <div className="recipe-photo" 
                      id="remove-border-radius"
                      style={boxstyle}></div>
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
