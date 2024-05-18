import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddScenario from './pages/AddSenario';
import AllScenarios from './pages/AllSenarios';
import AddVehicle from './pages/AddVechicle';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-scenario" element={<AddScenario />} />
            <Route path="/all-scenarios" element={<AllScenarios />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
