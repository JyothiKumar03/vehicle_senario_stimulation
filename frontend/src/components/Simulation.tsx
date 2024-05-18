import React, { useState, useEffect, ChangeEvent } from 'react';
import { useSelector ,  useDispatch } from 'react-redux';
import { RootState, Vehicle } from '../types/types';
import { deleteVehicle } from '../APIs/vehicleCalls';


export const Simulation: React.FC = () => {
  const ScenarioList = useSelector((state: RootState) => state.scenario.ScenarioList);
  const ScenarioID = useSelector((state: RootState) => state.scenario.ScenarioID);
  const firstScenarioName = ScenarioList[0]?.scenarioName ?? "";
//   alert(ScenarioList)
  console.log(ScenarioList)
  const [scenarioName, setScenarioName] = useState<string>(firstScenarioName);
  const [scenarioTime, setScenarioTime] = useState<number>(0);
  const vehicleList: Vehicle[] | undefined = ScenarioList[ScenarioID[scenarioName]]?.vehicleList;
  const sortedVehicleList: Vehicle[] = vehicleList ? [...vehicleList] : [];

  sortedVehicleList.sort(
    (vehicle1, vehicle2) => {
      return (
        (vehicle1.positionX * 14 + vehicle1.positionY) - (vehicle2.positionX * 14 + vehicle2.positionY)
      );
    }
  );

  const [vehicleList2, setVehicleList2] = useState<Vehicle[]>(sortedVehicleList);
  let vehicleIndex = 0;

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
              newPositionX = Math.min(vehicle.positionX + 1, 14); // Ensure position stays within grid
              break;
            case 'Upwards':
              newPositionX = Math.max(vehicle.positionX - 1, 1); // Ensure position stays within grid
              break;
            case 'Backwards':
              newPositionY = Math.max(vehicle.positionY - 1, 1); // Ensure position stays within grid
              break;
            case 'Towards':
              newPositionY = Math.min(vehicle.positionY + 1, 6); // Ensure position stays within grid
              break;
            default:
              break;
          }

          // Show message if vehicle hits the border
          if (newPositionX === 1 || newPositionX === 14 || newPositionY === 1 || newPositionY === 6) {
            console.log(`Vehicle ${vehicle.id} cannot go beyond the border.`);
            // alert(`Vehicle ${vehicle.vehicleName} cannot go beyond the border.`)
          }

          return { ...vehicle, positionX: newPositionX, positionY: newPositionY };
        });

        setVehicleList2(updatedVehicleList);
        setScenarioTime(scenarioTime - 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [vehicleList2, scenarioTime]);

  console.log('outside vehicleList2 -', vehicleList2)
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

  const handleDeleteEvent = (vehicleId) => {
    try{
      const resposne = deleteVehicle(vehicleId);
      console.log('delete vehicle in the simulation successful');
    } catch(error : any){
      console.log(`delete vehicle in the simulation failed - ${error.message}`);
    }
  }

  return (
    <div style={{ width: '130%', backgroundColor: 'black', padding: '20px', margin: '0 auto', height:'100vh'}}>
      <div style={{ margin: '10px 0', display: 'flex', flexDirection: 'column' }}>
        <strong style={{ color: 'white', marginBottom: '10px' }}>Scenario</strong>
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
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ border: '1px solid white', padding: '8px' }}>Vehicle ID</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Vehicle Name</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Position X</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Position Y</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Speed</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Direction</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Edit</th>
              <th style={{ border: '1px solid white', padding: '8px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicleList &&
              vehicleList.map((vehicleItem, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#444' : '#555', color: 'white' }}>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{vehicleItem.vehicleName}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{vehicleItem.positionX}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{vehicleItem.positionY}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{vehicleItem.speed}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>{vehicleItem.directions}</td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>
                    <button>📝</button>
                  </td>
                  <td style={{ border: '1px solid white', padding: '8px' }}>
                    <button onClick={(e: any) => handleDeleteEvent(vehicleItem.id)}>🗑️</button>
                  </td>           
                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ margin: '0px 10px' }} onClick={handleClick}>
                    <button color="green">Start Simulation</button>
                </div>
                <div style={{ margin: '0px 10px' }}>
                    <button color="red">Stop Simulation</button>
                </div>
            </div>
            <div style={{
                display: 'grid',
                backgroundColor: 'black',
                position: 'relative',
                width: '80%',
                height: '55.5%',
                marginTop: '5%',
                // border: '1px solid green',
                gridTemplateRows: 'repeat(6, 50px)',
                gridTemplateColumns: 'repeat(14, 50px)',
                zIndex: 1
            }}>

{Array.from({ length: 84 }).map((_, index) => {
    const rowIndex = Math.floor(index / 14);
    const colIndex = index % 14;
    const occupyingVehicle = vehicleList2.find(vehicle => vehicle.positionX === colIndex + 1 && vehicle.positionY === rowIndex + 1);
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


        </div>
    )
}