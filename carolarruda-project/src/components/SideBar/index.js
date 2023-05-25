import './style.css'

const SideBar = ({ className }) => {
  return (
    <div className={className}>
  
      <form className='center-it form-style'>
        <label></label>
        <input type="text" placeholder="Search recipes" />
      </form>

      <button className="btn-add">Home</button>
      <button className="btn-add">Add new recipes</button>
      <button className="btn-add">Favorites</button>
      <button className="btn-add">Settings</button>

    </div>
  );
};

export default SideBar;