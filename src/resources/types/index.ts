export interface Room {
    id: number;
    name: string;
    capacity: number;
    sessions?: any[];
}

export interface RoomCreateInput {
    name: string;
    capacity: number;
}

export interface RoomUpdateInput extends Partial<RoomCreateInput> {
    id: number;
}