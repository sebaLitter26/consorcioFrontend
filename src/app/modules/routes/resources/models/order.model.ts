
import { Observable } from "rxjs";
import { StationConfiguration } from "../../../station-configuration";



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
    id: number;
  
}
export interface Curso{
    id: number;
    curso: string;
    evaluacion: boolean;
}

export interface Sector{
    id: number;
    descripcion: string;
    habilitado: string;
    finsert: string;
}

export interface FilterPsico{
    desde?: string;
    hasta: string;
    legajo: string;
    doc_nro: string;
    result: string;
}

export interface Nomina{
    apellido_nombre: string;
    denominación_objeto: string;
    gr_prof: string;
    n_pers: number;
    subper: number;
}

export interface Sucursal{
    sucursal: number;
    localidad: string;
    direccion: string;
    descripcion: string;
}

export interface Empleado1{
    Activo: boolean;
    AntiguedadEmpresa: string;
    AntiguedadPuesto: string;
    CentroDescripcion?: string;
    CentroId: string;
    Division: string;
    Edad: number;
    EsACargo: boolean;
    EsResponsable: boolean;
    FechaBaja: string;
    FechaIngreso: string;
    FechaNacimiento: string;
    FechaPuesto: string;
    Foto: string;
    Funcion: string;
    FuncionId: string;
    Gerencia: string;
    Legajo: string;
    NombreApellido: string;
    NroDocumento: string;
    Posicion: string;
    Sector: string;
    SectorACargoDesde: string;
    SectorACargoId: string;
    SectorId: string;
    TipoEmpleado: number;
}


export interface Empleado{
    legajo: string;
    nombre: string;
    gerencia: string;
    sector: string;
    centrocosto: string;
    funcion: string;
    subdivision: string;
    fechaingreso: string;
    division: string;
    codigoarea: string;
    areadescripcion: string;
    grupopersona: string;
    grupopersonadescripcion: string;
    unidadorganizativa: string;
    tipodocumento: string;
    nrodocumento: string;
    funciondescripcion: string;
    codigopuesto: string;
    proveedor: string;
    nombreproveedor: string;
    fechabaja: string;
    MGTXT: string;
    MASSG: string;
    tipoempleado: string;
    foto: string;
    nivel: string;
    telefonos: {telefono: Telefono};
    emails: {email: Email};
    edadnacimiento: EdadNacimiento;
    antiguedad: string;
    sucursal:string;
    essucursalventa: boolean;
    presente: boolean;
    fueraconvenio: string;
}

export interface Telefono{
    corto: number| null
    largo: number| null;
    principal: boolean;
    tipo: TipoTelefono;

}

export interface TipoTelefono{
    codigo: string;
    descripcion: string;
}

export interface Email{
    mail:string;
    principal:boolean;
}

export interface EdadNacimiento{
    fechanacimiento:string;
    edad: number;
}


export interface Psico{
    activo: number;
    antiguedad: string;
    apellido_nombre: string;
    bateria_tests?: string;
    cargo?: string;
    des_funcion: string;
    edad: number;
    fec_baja: string;
    fec_ing: string;
    fecha_toma: string;
    finsert: string;
    foto: string;
    gerencia: string;
    gru_pers_txt: string;
    grupo_pers: number;
    id: number;
    idcarga: string;
    legajo: number;
    nom_equipo?: string;
    non_usuario?: string;
    nrodoc: number;
    psicologo: string;
    puesto_postulado: string;
    result: string;
    sector: string;
    subdivision: number;
    observaciones: string;
    
}





