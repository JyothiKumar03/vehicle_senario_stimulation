export interface Scenario {
    id : number,
    scenarioName : string,
    time : number,
    vehicleList : Vehicle[],
}

type directions_allowed = 'Towards' | 'Backwards' | 'Upwards' | 'Downwards';

export interface Vehicle {
    id : number,
    vechicleName : string,
    positionX : number,
    positionY : number,
    speed : number,
    directions : directions_allowed,
    scenarioName : string,
}