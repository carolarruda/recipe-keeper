import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Delete from "../icons/delete";
import Edit from "../icons/edit";

const Main = ({ className, recipes }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleHoverIn = (index) => {
    setHoveredCard(index);
  };

  const handleHoverOut = () => {
    setHoveredCard(null);
  };

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
              };

              return (
                <>
                  <div
                    className="box"
                    style={cardBox}
                    onMouseEnter={() => handleHoverIn(index)}
                    onMouseLeave={handleHoverOut}
                  >
                    <div className="icons-container">
                      <Delete show={show} />
                      <Edit show={show} />
                    </div>
                    <Link key={item.id} to={`${item.id}`} style={styleForphoto}>
                      <div className="recipe-photo" style={boxstyle}></div>
                      {item.title}
                    </Link>
                  </div>
                </>
              );
            })}
        </section>
      </div>
    </>
  );
};

export default Main;
