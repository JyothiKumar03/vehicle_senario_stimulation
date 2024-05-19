import {Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import { Scenario ,Vehicle } from '../types/datatypes'

const dataPath = path.join(__dirname,'../../data/data.json')

const readData = () : {scenarios : Scenario[], vehicles : Vehicle[]}=>{
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(jsonData);
      } catch (error) {
        throw new Error('Error reading data');
      }
}

const writeData = (data : {scenarios : Scenario[], vehicles : Vehicle[]}) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      } catch (error) {
        throw new Error('Error writing data');
      }
}

export const getSenarios = (req: Request, res: Response) => {
    try {
        const data = readData();
        res.json(data.scenarios);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving scenarios' });
      }
}

export const addSenario = (req: Request, res: Response) => {
    try {
        const data = readData();
        const newScenario: Scenario = { id: Date.now(), ...req.body };
        data.scenarios.push(newScenario);
        writeData(data);
        res.json(newScenario);
      } catch (error) {
        res.status(500).json({ message: 'Error adding scenario' });
      }
}

export const updateSenario = (req: Request, res: Response) => {
    try {
        const data = readData();
        const scenarioIndex = data.scenarios.findIndex((scenario) => scenario.id === parseInt(req.params.id));
        if (scenarioIndex >= 0) {
          data.scenarios[scenarioIndex] = { ...data.scenarios[scenarioIndex], ...req.body };
          writeData(data);
          res.json(data.scenarios[scenarioIndex]);
        } else {
          res.status(404).json({ message: 'Scenario not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating scenario' });
      }
}

export const deleteScenario = (req: Request, res: Response) => {
    try{
        const data = readData();
        data.scenarios = data.scenarios.filter((scenario : any) => scenario.id !== parseInt(req.params.id));
        writeData(data);
        res.status(200).json(data.scenarios);
    } catch(error: any){
        res.status(500).json({message: 'Error occured while deleting the scenario'});
    }
}

export const deleteAllScenarios = (req: Request, res : Response) => {
  try{
    // console.log('invoked funciton')
    const data = readData();
    data.scenarios = [];
    data.vehicles = [];
    writeData(data);
    // console.log(data);
    res.status(200).send(data.scenarios);
  } catch(error : any){
    res.status(500).json({message: 'Error occured while deleting all scenarios'});
  }
}

export const addVehicleToScenario = (req: Request, res : Response) => {
  try{
    const {scenarioName} = req.params
    const vehicle = req.body;
    const data = readData();
    const scenario = data.scenarios.find((scenario : Scenario) => scenario.scenarioName === scenarioName)
    if(scenario){
      scenario.vehicleList = scenario.vehicleList || [];
      scenario.vehicleList.push(vehicle)
    }
    writeData(data);
    res.status(200).json({message : `Vehicle added successfully`})
  } catch(error : any){
    res.status(500).json({message : `Issue in adding vehicle to scenario`});
  }
}
