import "../styles/style.css";

const Settings = ({ className }) => {
  return (
    <>
      <div className={className} id="main-container-settings">
        <div className="settings-title">SETTINGS</div>
        <div className="theme-grid">
          <form>
            <label className="colors" htmlFor="colors">THEME</label>
            <div className="colors">
              <button className="lavender btn-no-style"></button>
              <button className="orange btn-no-style"></button>
              <button className="blue btn-no-style"></button>
              <button className="default btn-no-style"></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
