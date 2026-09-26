export interface RoutePoint{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface Route{
    id: string;
    name: string;
    description: string;
    points: RoutePoint[];
    color: string;
}