import React, { useState, useEffect, ChangeEvent } from 'react';
import { addVehicle } from '../APIs/vehicleCalls';
import { getAllScenarios } from '../APIs/scenarioCalls';
import '../App.css';
import { directions_allowed, Vehicle } from '../types/types';
import { addvehicle , setScenarios } from '../store/ScenarioSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
 

export const AddVehicle: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [vehicleName, setVehicleName] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [positionX, setPositionX] = useState<string>('');
  const [positionY, setPositionY] = useState<string>('');
  const [direction, setAllDirection] = useState<directions_allowed | string>('');
  const [data, setData] = useState<{ scenarioName: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const scenarioList = useSelector((state: RootState) => state.scenario.ScenarioList);
    console.log(scenarioList)
  useEffect(() => {
    const fetchAllScenariosData = async () => {
      try {
        const data = await getAllScenarios();
        console.log(`Fetched Data: ${data}`);
        setData(data);
      } catch (error: any) {
        console.log(`Error in fetching all scenarios call: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAllScenariosData();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
  
    if (!selectedScenario) {
      newErrors.selectedScenario = `Scenario is Required`;
    }
    if (!vehicleName) {
      newErrors.vehicleName = `Vehicle Name is Required`;
    }
    if (!speed) {
      newErrors.speed = `Speed is Required`;
    } else if (isNaN(Number(speed))) {
      newErrors.speed = `Speed must be a number`;
    }
    if (!positionX) {
      newErrors.positionX = `Position X is required`;
    } else if (isNaN(Number(positionX)) || Number(positionX) < 1 || Number(positionX) > 14) {
      newErrors.positionX = `Position X must be a number between 1 and 14`;
    }
    if (!positionY) {
      newErrors.positionY = `Position Y is required`;
    } else if (isNaN(Number(positionY)) || Number(positionY) < 1 || Number(positionY) > 6) {
      newErrors.positionY = `Position Y must be a number between 1 and 6`;
    }
    if (!direction) {
      newErrors.direction = `Direction is Required`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleAddVehicle = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const vehicle: Vehicle = {
        id: Date.now(),
        vehicleName,
        positionX: Number(positionX),
        positionY: Number(positionY),
        speed: Number(speed),
        directions: direction as directions_allowed,
        scenarioName : selectedScenario
      };
  
      // Add the vehicle to the backend
      const response = await addVehicle(vehicle , selectedScenario);
      // Fetch all scenarios again to update the state with the newly added vehicle
      const scenarios = await getAllScenarios();
      // Find the scenario to which the vehicle was added and update its vehicleList
      const updatedScenarios = scenarios.map((scenario:any) => {
        if (scenario.scenarioName === selectedScenario) {
          let updatedVehicleList = scenario.vehicleList.push(vehicle)
          return {
            ...scenario,
            vehicleList: updatedVehicleList
          };
        }
        return scenario;
      });
      // Dispatch the updated scenarios to the Redux store
      dispatch(setScenarios(updatedScenarios)); 
      console.log(updatedScenarios);
      handleReset();
    } catch (error: any) {
      console.log(error);
    }
  };
  

  const handleReset = () => {
    setSelectedScenario('');
    setVehicleName('');
    setSpeed('');
    setPositionX('');
    setPositionY('');
    setAllDirection('');
    setErrors({});
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
  };

  if (loading) {
    return <>Loading Data ..!!</>;
  }

  return (
    <div className='AddScenario'>
      <div className='scenarioPath'>Vehicle / Add</div>
      <div className='Scenario-heading'>Add Vehicle</div>
      <div className='Vehicle-body'>
        <div className='row'>
          <div className='inputs'>
            <label htmlFor='scenarioList'>Scenario List</label>
            <select className='direction' id='scenarioList' value={selectedScenario} onChange={handleChange(setSelectedScenario)}>
              <option value="" disabled hidden>Select Scenario</option>
              {data && data.map((scenario: any, index: any) => (
                <option key={index} value={scenario.scenarioName}>{scenario.scenarioName}</option>
              ))}
            </select>
            {errors.selectedScenario && <div className='error'>{errors.selectedScenario}</div>}
          </div>
          <div className='inputs'>
            <label htmlFor='vehicleName'>Vehicle Name</label>
            <input type="text" id="vehicleName" value={vehicleName} onChange={handleChange(setVehicleName)} />
            {errors.vehicleName && <div className='error'>{errors.vehicleName}</div>}
          </div>
          <div className='inputs'>
            <label htmlFor='speed'>Speed</label>
            <input type="text" id="speed" value={speed} onChange={handleChange(setSpeed)} />
            {errors.speed && <div className='error'>{errors.speed}</div>}
          </div>
          </div>
          <div className='row'>
            <div className='inputs'>
              <label htmlFor='positionX'>Position X</label>
              <input type='text' id='positionX' value={positionX} onChange={handleChange(setPositionX)} />
              {errors.positionX && <div className='error'>{errors.positionX}</div>}
            </div>
            <div className='inputs'>
              <label htmlFor='positionY'>Position Y</label>
              <input type='text' id='positionY' value={positionY} onChange={handleChange(setPositionY)} />
              {errors.positionY && <div className='error'>{errors.positionY}</div>}
            </div>
            <div className='inputs'>
              <label htmlFor='direction'>Direction</label>
              <select className='direction' id='direction' value={direction} onChange={handleChange(setAllDirection)} >
                <option value="" disabled>Select Direction</option>
                <option value="Towards">Towards</option>
                <option value="Upwards">Upwards</option>
                <option value="Forwards">Forwards</option>
                <option value="Backwards">Backwards</option>
              </select>
              {errors.direction && <div className="error">{errors.direction}</div>}
            </div>
          </div>
        
        <div className="button-div">
          <button className='button' style={{ backgroundColor: '#5CB65E' }} onClick={handleAddVehicle}>Add</button>
          <button className='button' style={{ backgroundColor: '#DF7B36' }} onClick={handleReset}>Reset</button>
          {/* <button className='button' style={{ backgroundColor: '#4C9AB8' }} onClick={handleGoBack}>Go Back</button> */}
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
