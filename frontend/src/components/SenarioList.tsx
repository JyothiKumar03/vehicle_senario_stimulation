import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllScenarios } from '../APIs/scenarioCalls';
import { Scenario } from '../types/types';
import { setScenarios } from '../store/ScenarioSlice';
import '../App.css';

export const ScenarioList: React.FC = () => {
  const [data, setData] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchScenarioList = async () => {
      try {
        const data = await getAllScenarios();
        setData(data);
        dispatch(setScenarios(data)); // Dispatch action to set scenarios in Redux store
      } catch (error: any) {
        console.log(`Error fetching scenarios: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchScenarioList();
  }, [dispatch]);

  if (loading) {
    return <div>Fetching all Scenario's List</div>;
  }
  return (
    <div className="AddScenario">
      <div className="AllScenario-header">
        <div className="Scenario-heading">All Scenarios</div>
        <div className="button-div">
          <button className="button" style={{}}>New Scenario</button>
          <button className="button" style={{}}>Add Scenario</button>
          <button className="button" style={{}}>Delete All</button>
        </div>
      </div>
      <div className="allScenario-body">
        <table className="scenario-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ border: '1px solid white', padding: '8px' }}>Scenario ID</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Scenario Name</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Scenario Time</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((scenario, index) => (
              <tr key={index + 1} style={{ backgroundColor: index % 2 === 0 ? '#444' : '#555', color: 'white' }}>
                <td style={{ border: '1px solid white', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{scenario.scenarioName}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{scenario.scenarioTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
