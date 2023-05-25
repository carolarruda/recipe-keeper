
import './App.css';
import SideBar from './components/SideBar'
import Main from './components/Main'

function App() {
  return (
    <div className="grid">
     <SideBar className='nav-container'/>
      <Main className='main-container'/>
    </div>
  );
}

export default App;
