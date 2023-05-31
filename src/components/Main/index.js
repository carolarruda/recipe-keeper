import "./style.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Delete from "../icons/delete";

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
                  ? "contrast(110%)"
                  : "grayscale(15%) blur(1px)",
 
                minHeight: isHovered ? "270px" : "265px",
                minWidth: isHovered ? "270px" : "265px",
              };
              const cardBox = {
                backgroundColor: isHovered ? "#c5e2e7" : "#d8dfe6",
                borderBottom: isHovered
                  ? "3px solid #9ecdd4"
                  : "3px solid transparent",
              };
              const show = {
                fill: isHovered ? "#30505b" : 'transparent',
                paddingLeft: "10px",
                paddingTop: "10px",
       
              }

              return (
                <Link
                  key={item.id}
                  to={`${item.id}`}
                  style={{ textDecoration: "none" }}
                  onMouseEnter={() => handleHoverIn(index)}
                  onMouseLeave={handleHoverOut}
                >
                  <div className="box" style={cardBox}>
                  <Delete show={show} />
                    <div className="recipe-photo" style={boxstyle}></div>

                    {item.title}
                  </div>
                </Link>
              );
            })}
        </section>
      </div>
    </>
  );
};

export default Main;
