import React, { useState, useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import {Scenario, Vehicle } from '../types/types';
import { deleteVehicle } from '../APIs/vehicleCalls';
import '../App.css'
// import { useNavigate } from 'react-router-dom';
import { getAllScenarios } from '../APIs/scenarioCalls';
import { setScenarios } from '../store/ScenarioSlice';

export const Simulation: React.FC = () => {

  const [data, setData] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // const ScenarioList = useSelector((state: RootState) => state.scenario.ScenarioList);
  const ScenarioList = data;
  // const ScenarioID = useSelector((state: RootState) => state.scenario.ScenarioID);
  const ScenarioID = ScenarioList.reduce((acc, scenario, index) => {
    acc[scenario.scenarioName] = index;
    return acc;
  }, {} as { [key: string]: number });
  const firstScenarioName = ScenarioList[0]?.scenarioName ?? "";
  const [scenarioName, setScenarioName] = useState<string>(firstScenarioName);
  const [scenarioTime, setScenarioTime] = useState<number>(0);
  let vehicleList: Vehicle[] | undefined = ScenarioList[ScenarioID[firstScenarioName]]?.vehicleList
  const sortedVehicleList: Vehicle[] = vehicleList ? [...vehicleList] : [];
  const [hitBoundary, setHitBoundary] = useState<boolean>(false);

  sortedVehicleList.sort(
    (vehicle1, vehicle2) => {
      return (
        (vehicle1.positionX * 14 + vehicle1.positionY) - (vehicle2.positionX * 14 + vehicle2.positionY)
      );
    }
  );

  const [vehicleList2, setVehicleList2] = useState<Vehicle[]>(sortedVehicleList);
  // let vehicleIndex = 0;


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

  useEffect(() => {

    if (vehicleList) {
      setVehicleList2(vehicleList);
    }
  }, [vehicleList]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (scenarioTime > 0) {
        const updatedVehicleList = vehicleList2.map((vehicle: Vehicle) => {
          let newPositionX = vehicle.positionX;
          let newPositionY = vehicle.positionY;

          // Update positions based on directions
          switch (vehicle.directions) {
            case 'Downwards':
              newPositionX = Math.min(vehicle.positionX + 1, 14); 
              break;
            case 'Upwards':
              newPositionX = Math.max(vehicle.positionX - 1, 1); 
              break;
            case 'Backwards':
              newPositionY = Math.max(vehicle.positionY - 1, 1); 
              break;
            case 'Towards':
              newPositionY = Math.min(vehicle.positionY + 1, 6); 
              break;
            default:
              break;
          }

          if (newPositionX === 1 || newPositionX === 14 || newPositionY === 1 || newPositionY === 6) {
            console.log(`Vehicle ${vehicle.id} cannot go beyond the border.`);
            setHitBoundary(true)
            // return <div>Vehicle Hitted the boundary of Grid</div>
            // alert(`Vehicle ${vehicle.vehicleName} cannot go beyond the border.`)
          }
          return { ...vehicle, positionX: newPositionX, positionY: newPositionY };
          // return { ...vehicle, positionX: newPositionX, positionY: newPositionY };
        });

        setVehicleList2(updatedVehicleList);
        setScenarioTime(scenarioTime - 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [vehicleList2, scenarioTime]);

  // console.log('outside vehicleList2 -', vehicleList2)



  const handleClick = () => {
    const tempDir = vehicleList2?.map((vehicle: Vehicle) => {
      switch (vehicle?.directions) {
        case 'Downwards':
          return { ...vehicle, positionX: vehicle.positionX + 1 };
        case 'Upwards':
          return { ...vehicle, positionX: vehicle.positionX - 1 };
        case 'Backwards':
          return { ...vehicle, positionY: vehicle.positionY - 1 };
        case 'Towards':
          return { ...vehicle, positionY: vehicle.positionY + 1 };
        default:
          return vehicle;
      }
    });
    setVehicleList2(tempDir);
    setScenarioTime(parseInt(ScenarioList[0]?.scenarioTime) - 1 || 0);
  };

  const handleDeleteEvent = async (vehicleId: number) => {
    try {
      const response = await deleteVehicle(vehicleId);
      setVehicleList2(response);
      vehicleList = response;
      window.location.reload()
      console.log('delete vehicle in the simulation successful');
    } catch (error: any) {
      console.log(`delete vehicle in the simulation failed - ${error.message}`);
    }
  }
  // console.log(vehicleList)

  if (vehicleList?.length == 0 || vehicleList2.length == 0) {
    return (<div><h1>No Vehicles for Scenarios are Available</h1></div>)
  }
  if(loading){
    return (<div><h1>Loading</h1></div>)
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
      <strong className='scenarioPath'>SCENARIO / Visualize</strong>
      <div style={{ marginBottom: '0.8rem', }}>
        <h2 className='scenarioPath'>Select Scenario</h2>
        <div className='inputs'>
          <select
            style={{ height: '30px', width: '150px' }}
            onChange={(e) => setScenarioName(e.target.value)}
            value={scenarioName}
          >
            {ScenarioList &&
              ScenarioList.map((scenarioItem, index) => (
                <option key={index} value={scenarioItem.scenarioName}>
                  {scenarioItem.scenarioName}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='AllScenario-body'>
        <table className='scenario-table' style={{ marginBottom: '0.8rem' }}>
          <thead>
            <tr>
              <th>Vehicle ID</th>
              <th>Vehicle Name</th>
              <th>Position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicleList &&
              vehicleList.map((vehicleItem, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#444' : '#555', color: 'white' }}>
                  <td>{index + 1}</td>
                  <td>{vehicleItem.vehicleName}</td>
                  <td>{vehicleItem.positionX}</td>
                  <td>{vehicleItem.positionY}</td>
                  <td>{vehicleItem.speed}</td>
                  <td>{vehicleItem.directions}</td>
                  <td>
                    <button style={{ border: 'none', fontSize: '24px', }} className='emoji-button'>📝</button>
                  </td>
                  <td>
                    <button style={{ border: 'none', fontSize: '24px', }} className='emoji-button' onClick={() => handleDeleteEvent(vehicleItem.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
        <div onClick={handleClick}>
          <button className='button' style={{ backgroundColor: '#5CB65E', padding: '0.5rem' }}>Start Simulation</button>
        </div>
        <div>
          <button className='button' style={{ backgroundColor: '#4C9AB8', padding: '0.5rem' }}>Stop Simulation</button>
        </div>
      </div>
      {hitBoundary && <div><h5>Vehicle has hit the boundary of Grid.</h5></div>}
      { vehicleList?.length!=0 && vehicleList2.length!=0 &&
        <div style={{
          display: 'grid',
          backgroundColor: 'black',
          position: 'relative',
          width: '60%',
          height: '55.5%',
          marginLeft: '10rem',
          // border: '1px solid green',
          gridTemplateRows: 'repeat(6, 50px)',
          gridTemplateColumns: 'repeat(14, 50px)',
          zIndex: 1
        }}>
          {Array.from({ length: 84 }).map((_, index) => {
            const rowIndex = Math.floor(index / 14);
            const colIndex = index % 14;
            const occupyingVehicle = vehicleList2?.find(vehicle => vehicle.positionX === colIndex + 1 && vehicle.positionY === rowIndex + 1);
            return (
              <div
                key={index}
                style={{
                  border: '1px solid green',
                  height: '50px',
                  width: '50px',
                  textAlign: 'center',
                  color: 'white',
                  backgroundColor: occupyingVehicle ? 'transparent' : 'black'
                }}
              >
                {occupyingVehicle ? vehicleList2.indexOf(occupyingVehicle) + 1 : ''}
              </div>
            );
          })}
        </div>
      }{
        vehicleList2.length==0 && <div><h1>No vehicles Present</h1></div>
      }
    </div>

  )
}