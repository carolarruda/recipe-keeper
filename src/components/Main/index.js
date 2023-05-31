import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Delete from "../icons/delete";
import Edit from "../icons/edit";

const Main = ({ className, recipes, setRecipes, hoveredCard, handleHoverIn, handleHoverOut, handleDelete }) => {


  return (
    <>
      <div className={className}>
        <div></div>
        <section className="card-grid">
          {recipes.length > 0 &&
            recipes.map((item, index) => {
              const isHovered = hoveredCard === index;
              const boxstyle = {
                backgroundImage: `url(${item.photo})`,
                filter: isHovered
                  ? "brightness(100%)"
                  : "blur(1px) brightness(90%)",
                minHeight: isHovered ? "290px" : "285px",
                minWidth: isHovered ? "290px" : "285px",
              };
              const cardBox = {
                backgroundColor: isHovered ? "#c5e2e7" : "#d8dfe6",
                borderBottom: isHovered
                  ? "3px solid #9ecdd4"
                  : "3px solid transparent",
              };
              const show = {
                fill: isHovered ? "#30505b" : "transparent",
                padding: "3px",
                display: "grid",
                justifyContent: "center",
              };
              const styleForphoto = {
                textDecoration: "none",
                color: "#808080",
                display: "grid",
                textAlign: "left",
                paddingLeft: "5px"
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
                    <Link to={`recipes/edit/${item.id}`}>
                      <Edit show={show} />
                    </Link>
                  </div>

                  <Link to={`${item.id}`} style={styleForphoto}>
                    <div className="recipe-photo" style={boxstyle}></div>
                  </Link>
                  <div  className="recipe-name">{item.title}</div>
                </div>
              );
            })}
        </section>
      </div>
    </>
  );
};

export default Main;
