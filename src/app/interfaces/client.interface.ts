import { Region } from "./region.interface";

export interface Cliente{
    id?: number;
    nombre: string;
    apellido: string;
    createAt?: string | Date; 
    email: string, 
    region?: Region;
}