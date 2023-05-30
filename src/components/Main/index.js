import "./style.css";
import { Link } from "react-router-dom";

const Main = ({ className, recipes }) => {

  return (
    <>
      <div className={className}>
        <div></div>
        <section className="card-grid">
        {recipes.length > 0 && (recipes.map(item => {
          return (
        <Link key={item.id} to={`${item.id}`} style={{textDecoration: "none"}}><div  style ={{ backgroundImage: `url(${item.photo})`}} >{item.title}</div></Link>
          )
        }))}
          
        </section>
      </div>
    </>
  );
};

export default Main;
