export interface Scenario {
    id : number,
    scenarioName : string,
    scenarioTime : string,
    vehicleList ?: Vehicle[];
}

export type directions_allowed = 'Towards' | 'Backwards' | 'Upwards' | 'Downwards';

export interface Vehicle {
    id : number,
    vehicleName : string,
    positionX : number,
    positionY : number,
    speed : number,
    directions : directions_allowed,
    scenarioName : string,
}

export interface ScenarioState {
    ScenarioList : Scenario[],
    ScenarioID : { [key : string] : number}
}

export interface RootState {
    scenario: {
        ScenarioList: Scenario[];
        ScenarioID: { [key: string]: number };
    };
}