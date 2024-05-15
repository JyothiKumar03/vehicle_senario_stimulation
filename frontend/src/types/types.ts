export interface Senario {
    id : number,
    senarioName : string,
    time : number
}

type directions_allowed = 'Towards' | 'Backwards' | 'Upwards' | 'Downwards';

export interface Vechicle {
    id : number,
    vechicleName : string,
    positionX : number,
    positionY : number,
    speed : number,
    directions : directions_allowed,
}