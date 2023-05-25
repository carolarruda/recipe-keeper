import './style.css'
import {Link} from 'react-router-dom'

const SideBar = ({ className }) => {
  return (
    <div className={className}>
  
      <form className='center-it form-style'>
        <label></label>
        <input type="text" placeholder="Search recipes" />
      </form>

   
      <Link to={'/'}><button className="btn-add">Home</button></Link>
      <Link to={'add-new-recipe'}><button className="btn-add">Add new recipes</button></Link>
      <button className="btn-add">Favorites</button>
      <button className="btn-add">Settings</button>

    </div>
  );
};

export default SideBar;