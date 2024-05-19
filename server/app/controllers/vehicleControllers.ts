import { Request, Response } from "express";
import fs from 'fs'
import path from 'path'
import { Scenario, Vehicle } from "../types/datatypes";

const dataPath = path.join(__dirname, '../../data/data.json')

const readData = () : {scenarios : Scenario[], vehicles : Vehicle[]} =>{
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

export const getVehicles = (req: Request, res: Response) => {
    try{
        const data = readData();
        return res.status(200).json(data.vehicles)
    } catch(error : any){
        return res.status(404).json(`Error in fetching data - ${error.message}`)
    }
}

export const addVehicle = (req: Request, res: Response) => {
    try{
        const data = readData();
        const newVehicle = {id: Date.now(), ...req.body}
        const {scenarioName} = req.params
        // console.log(scenarioName);
        data.vehicles.push(newVehicle);
        const scenario = data.scenarios.find((scenario : Scenario) => scenario.scenarioName === scenarioName)
        // console.log('before iterating - ',scenario);
        if(scenario){
        scenario.vehicleList = scenario.vehicleList || [];
        scenario.vehicleList.push(newVehicle)
        // console.log('Scenario in vehicle - ', scenario)
        }
        writeData(data);
        return res.status(201).json({message : 'Vehicle added successfully'});
    } catch(error : any){
        return res.status(500).json(`Error in writing data - ${error.message}`)
    }
}

export const updateVehicle = (req: Request , res: Response) => {
    try{
        const data = readData();
        const vehicleIndex = data.vehicles.findIndex((vehicle : any) => vehicle.id === parseInt(req.params.id));
        if(vehicleIndex >= 0){
            data.vehicles[vehicleIndex] = {...data.vehicles[vehicleIndex], ...req.body}
            writeData(data);
            return res.status(200).json({message : `Vehicle updated successfully`});
        } else{
            return res.status(404).json({message : `vehicle index not found`});
        }
    } catch(error : any){
        return res.status(500).json({message : `vehicle update failed`});
    }
}

export const deleteVehicle = (req: Request, res: Response ) => {
    try{
        const data = readData();
        const vehicleId = parseInt(req.params.id);
        data.vehicles = data.vehicles.filter((vehicle : any) => vehicle.id !== parseInt(req.params.id));
        const scenario = data.scenarios.find((scenario: Scenario) => scenario.vehicleList.some((vehicle: Vehicle) => vehicle.id === vehicleId));
        if (scenario) {
            scenario.vehicleList = scenario.vehicleList.filter((vehicle: Vehicle) => vehicle.id !== vehicleId);
        }
        writeData(data);
        return res.status(200).json(data)
    } catch(error : any){
        return res.status(500).json({message : `Error occured in deleting vehicle`});
    }
}