import { Scenario } from '../types/types';
import axios from 'axios'

const ScenarioAPIs = axios.create({
    baseURL : `http://localhost:8080`
})

export const addSenario = async(scenarioData : Scenario) => {
    try{
        const response = await ScenarioAPIs.post(`/scenarios`, scenarioData);
        return response.data;
    } catch(error : any){
        console.log(`Error in Adding Scenario Call`)
        throw error;
    }
}

// Function to get all scenarios
export const getAllScenarios = async () => {
  try {
    const response = await ScenarioAPIs.get(`/scenarios`);
    return response.data;
  } catch (error) {
    console.log(`Error in Getting Scenario data Call`)
    throw error;
  }
};

export const deleteScenario = async (scenarioId : number) => {
  try{
    const response = await ScenarioAPIs.delete(`/scenarios/${scenarioId}`)
    return response.data;
  } catch(error : any){
    console.log(`Error in deleting Scenario data Call`)
    throw error;
  }
}

export const deleteAllScenarios = async () => {
  try{
    const response = await ScenarioAPIs.delete(`/scenarios`);
    return response.data;
  } catch(error : any){
    console.log(`Error in deleting all Scenarios data Call`)
    throw error;
  }
}