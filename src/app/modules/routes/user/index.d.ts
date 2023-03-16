export type QrAction = "reprintQR" | "getFirstQR";


export interface CustomCard<T> {
    header: string;
    icon: string;
    prop: keyof T;
    color: string;
}



export interface Empleado {
    Foto: string;
    NombreApellido: string;
    Funcion: string;
    AntiguedadEmpresa: string;
    AntiguedadPuesto: string;
    CentroDescripcion: string;
    Division: string;
    FechaPuesto: string;
    Legajo: string;
    Posicion: string;
    Sector: string;
}



export interface User{
    id: number,
    legajo: number,
    ntuser: string;
    apellido: string;
    nombre: string;
    image: string;
    habilitado:boolean;
    fupdate: string;
    finsert: string;
    id_rol: number,
    habilitado_rol: boolean;
}

export interface FormUser {
    legajo: string | null;
    sucursalsolicitante: string | null;
    fecha: Date | null;
    sector: string | null;
    puestopostulado: string | null;
    postula: string | null;
    result: string | null;
    psicologo: string | null;
    bateriatests: string | null;
    tieneveraz: boolean | null;
    observaciones: string | null;
    activo: boolean | null;
    apellidonombre: string | null;
    cargo: string | null;
    refpsico: boolean| null;
    gr_prof: string| null;
    doc_tipo: string | null;
    doc_nro: string | null;
    idcarga: string| null;
    nombreusuario: string| null;
    nombreequipo: string| null;
    tab: string| null;
  
}

