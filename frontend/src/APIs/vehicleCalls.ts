import { Vehicle } from '../types/types';
import axios from 'axios'

const VehicleAPIs = axios.create({
    baseURL : `https://vechile-backend-t67a.onrender.com/`
    // baseURL : `http://localhost:8080`
})

export const addVehicle = async (vehicleData : Vehicle, ScenarioName : string) => {
    try{
        const response = await VehicleAPIs.post(`/vehicles/${ScenarioName}`, vehicleData);
        return response.data;
    } catch(error : any){
        console.log(`Error in Adding Vehicles Call`)
        throw error;
    }
}

export const getVehicles = async () => {
    try{
        const response = await VehicleAPIs.post(`/vehicles`);
        return response.data;
    } catch(error : any){
        console.log(`Error in fetching Vehicles data call`);
        throw error;
    }
}

export const deleteVehicle = async (vehicleId : number) => {
    try{
        const response = await VehicleAPIs.delete(`/vehicles/${vehicleId}`);
        return response.data;
    } catch(error : any){
        console.log(`Error in deleting the Vehicle data call`);
        throw error;
    }
}