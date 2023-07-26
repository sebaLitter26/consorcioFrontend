import { User } from "./user";


export interface error {
    CODIGO: number;
    MENSAJE: string;
}


export interface CustomCard {
    header: string;
    icon: string;
    value: string;
    color: string;
}


export interface Building{
    id: string;
    address: string;
    location: string;
    letter: string;
    floors: number;
    createdAt?: string;
    updatedAt?: string;
    appartment?: Appartment[]
    //photo?: string | null;
}


export interface Appartment {
    id: string;
    building: Building;
    owner?: Owner | null;
    tenant?: Tenant | null;
    floor: number;
    letter: string;
    observation: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tenant {
    id: string;
    createdAt?: string;
    observation: string;
    appartments: Appartment;
    user: User;
    //__entity: string;
}


export interface Owner {
    id: string;
    createdAt?: string;
    observation: string;
    appartments: Appartment[];
    user: User;
}

export interface Identification{

    building: string;
    depto: string;
    floor: number;
    phone: number;
}


export interface Order extends Identification{
    cart: Product[];
    observaciones: string;
    id: number;
}

export interface Product{
    brand: string;
    photo: string;
    price: number;
    name: string;
    stock: number;

}
