import { Link } from 'react-router-dom';

const Sidebar : React.FC = () => {
  return (
    <div className="Sidebar" style={{height: "100vh" }}>
        <h2>Menu</h2>
        <ul className='sidebar-body'>
            <li><Link to="/" className="sidebar-list">Home</Link></li>
            <li><Link to="/add-scenario" className="sidebar-list">Add Scenario</Link></li>
            <li><Link to="/all-scenarios" className="sidebar-list">All Senarios</Link></li>
            <li><Link to="/add-vehicle" className="sidebar-list">Add Vechicles</Link></li>
        </ul>
    </div>
  )
}

export default Sidebar