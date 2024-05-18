import { Link } from 'react-router-dom';

const Sidebar : React.FC = () => {
  return (
    <div className="sidebar-head" style={{height: "100vh" }}>
        <h2>Menu</h2>
        <ul className='sidebar-body'>
            <li><Link to="/" className="sidebar">Home</Link></li>
            <li><Link to="/add-scenario" className="sidebar">Add Scenario</Link></li>
            <li><Link to="/all-scenarios" className="sidebar">All Senarios</Link></li>
            <li><Link to="/add-vehicle" className="sidebar">Add Vechicles</Link></li>
        </ul>
    </div>
  )
}

export default Sidebar