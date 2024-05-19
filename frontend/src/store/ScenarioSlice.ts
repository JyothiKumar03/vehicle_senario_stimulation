import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScenarioState, Scenario, Vehicle } from '../types/types';

const initialState: ScenarioState = {
  ScenarioList: [],
  ScenarioID: {},
};

const ScenarioSlice = createSlice({
  name: "scenario",
  initialState,
  reducers: {
    setScenarios: (state, action: PayloadAction<Scenario[]>) => {
      state.ScenarioList = action.payload.map(scenario => ({
        ...scenario,
        vehicleList: Array.isArray(scenario.vehicleList) ? scenario.vehicleList : [],
      }));
      state.ScenarioID = action.payload.reduce((acc, scenario, index) => {
        acc[scenario.scenarioName] = index;
        return acc;
      }, {} as { [key: string]: number });
    },
    
    addscenario: (state, action: PayloadAction<Omit<Scenario, 'scenarioid' | 'vehicleList'>>) => {
      const { scenarioName } = action.payload;
      const length = state.ScenarioList.length;
      state.ScenarioList.push({
        ...action.payload,
        id: length + 1,
        vehicleList: [],
      });
      state.ScenarioID = { ...state.ScenarioID, [scenarioName]: length };
    },
    addvehicle: (state, action: PayloadAction<Vehicle & { scenarioname: string }>) => {
      const id = state.ScenarioID[action.payload.scenarioname];
      state.ScenarioList[id]?.vehicleList?.push(action.payload);
    },
  },
});

export const { setScenarios, addscenario, addvehicle } = ScenarioSlice.actions;
export default ScenarioSlice.reducer;

