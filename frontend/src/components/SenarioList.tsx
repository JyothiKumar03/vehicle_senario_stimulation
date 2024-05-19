import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllScenarios, deleteScenario , deleteAllScenarios } from '../APIs/scenarioCalls';
import { Scenario } from '../types/types';
import { setScenarios } from '../store/ScenarioSlice';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export const ScenarioList: React.FC = () => {
  const [data, setData] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    // handleDeleteAllScenarios();
  }, [dispatch]);

  if (loading) {
    return <div>Fetching all Scenario's List</div>;
  }

  
  const handleDeleteAllScenarios = async ()=>{
    try{
      console.log('invoked');
      const response = await deleteAllScenarios();
      setData(response?.scenarios);
      dispatch(setScenarios(data))
    } catch(error : any){
      console.log(`Error deleting all scenarios: ${error.message}`);
    }
  }

  const handleDeleteScenario = async(scenarioId : number) => {
    try{
      const data = await deleteScenario(scenarioId);
      setData(data);
      dispatch(setScenarios(data));
    } catch(error : any){
      console.log(`failed to make the delete call`)
    }
  }

  if(data?.length <=0){
    return <div><h1>No Scenarios Added</h1></div>
  }


  return (
    <div className="AddScenario">
      <div className="AllScenario-header">
        <div className="Scenario-heading">All Scenarios</div>
        <div className="button-div">
          <button className="button" style={{backgroundColor: '#4C9AB8'}} onClick = {()=> navigate(`/add-scenario`)}>New Scenario</button>
          <button className="button" style={{backgroundColor: '#5CB65E'}} onClick = {()=> navigate(`/add-vehicle`)}>Add Vehicle</button>
          <button className="button" style={{backgroundColor: '#DF7B36'}} onClick={handleDeleteAllScenarios}>Delete All</button>
        </div>
      </div>
      <div className="AllScenario-body">
        <table className="scenario-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ border: 'none', padding: '8px' }}>Scenario ID</th>
              <th style={{ border: 'none', padding: '8px' }}>Scenario Name</th>
              <th style={{ border: 'none', padding: '8px' }}>Scenario Time</th>
              <th style={{ border: 'none', padding: '8px' }}>Number of Vehicles</th>
              <th style={{ border: 'none', padding: '8px' }}>Add Vehicle</th>
              <th style={{ border: 'none', padding: '8px' }}>Edit</th>
              <th style={{ border: 'none', padding: '8px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length>0 
             && data.map((scenario, index) => (
              <tr key={index + 1} style={{ backgroundColor: 'white' , color: '#333' }}>
                <td style={{ border: 'none', padding: '8px' }}>{index + 1}</td>
                <td style={{ border: 'none', padding: '8px' }}>{scenario.scenarioName}</td>
                <td style={{ border: 'none', padding: '8px' }}>{scenario.scenarioTime}</td>
                <td style={{ border: 'none', padding: '8px' }}>{scenario.vehicleList?.length}</td>
                <td style={{ border: 'none', padding: '8px' }}>
                  <button className='emoji-button' onClick={() => {
                    navigate(`/add-vehicle`),{state: {
                      scenarioId: scenario.id,
                    }}
                  }}>➕</button>
                  </td>
                <td style={{ border: 'none', padding: '8px' }}><button className='emoji-button'>📝</button></td>
                <td style={{ border: 'none', padding: '8px' }}><button className='emoji-button' onClick={()=>{handleDeleteScenario(scenario.id)}}>🗑️</button></td>
              </tr>
            )) 
            
            }  
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
