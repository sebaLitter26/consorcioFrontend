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


/**
 * Filtros para el alta/modificacion del perfil del empleado.
 */
 export interface FormPsico {
    legajo: string | null;
    sucursalsolicitante: string | null;
    fecha: Date | null;
    sector: string | null;
    
    id: number;
  
}


export interface Building{
    id: number;
    localidad: string;
    direccion: string;
    altura: number;
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





