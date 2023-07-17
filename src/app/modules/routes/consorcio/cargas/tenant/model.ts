import { ProcessState, ProcessStateStyle } from "src/app/modules/model";



/** 
 * Mapa de estilos de etiquetas para tipos de novedades.
 * Define la forma en la que se muestran los ids de novedades en el listado de novedades.
 */
export const TENANT_MAP: {[keys in TenantType]: ProcessStateStyle} = {
    1: {
        label: "FALTANTE",
        color: "white",
        backgroundColor: "var(--color-missing)",
    },
    2: {
        label: "SOBRANTE",
        color: "white",
        backgroundColor: "var(--color-surplus)",
    },
    3: {
        label: "DEFECTUOSO",
        color: "white",
        backgroundColor: "var(--color-defective)",
    },
    4: {
        label: "NO APTO",
        color: "white",
        backgroundColor: "var(--color-unfit)",
    },
}

/** Los tipos de novedad. */
export enum TenantType {
    FALTANTE = 1,
    SOBRANTE = 2,
    DEFECTUOSO = 3,
    NO_APTO = 4,
}

export const TENANT_STATES_PRIORITY: {[key: string]: number} = {
    "wip": 0,
    "nok": 1,
    "ok": 2,
}

export interface Tenant {
    id_tipo_novedad: TenantType;
    imagen: string;
    estado: ProcessState;
    fecha: string;
    fecha_ult_actualizacion: string;
    hostname: string;
    id_novedad: string;
    id_reserva: string;
    novedad: string;
    nro_expedicion: number;
    nro_viaje: number;
    pallet_wf: string;
    pedido_wf: string;
    solicitud_wf: string;
    usuario: string;
  
}

export interface TenantAuthorization {
    accion: string | null;
    estado: ProcessState;
    hostname: string | null;
    id_accion: number;
    id_novedad: string;
    id_rol: number;
    id_tipo_novedad: TenantType;
    observacion: string | null;
    orden: number;
    roll: string | null;
    permisos: string;
    usuario: string | null;
    tag: string | null;
    nombre: string | null;
}

export interface CurrentNoveltiesResolvedData {
    novelties: Tenant[];
}



export interface TenantAction {
    text: string;
    icon: string;
    dialogTitle: string;
    dialogMessage: string;
    dialogColor: "warn" | "accent" | "primary";
    clickFn: (observation: string) => void;
}

export interface TenantUpdatePayload {
    novedad: string;
    orden: number;
    aprueba: boolean;
    usuario: string;
    hostname: string;
    observacion: string;
    ubicacion: string;
}

export interface TenantTypeOption {
    value: TenantType;
    displayValue: string;
}

export interface TenantStateOption {
    value: ProcessState;
    displayValue: string;
}

export interface TenantFilters {
    tipoInquilino: TenantType[] | null;
    estado: ProcessState[] | null;
    fechaDesde: string | null;
    fechaHasta: string | null;
    nroReserva: string | null;
    limit: number;
    page: number;
}

export interface CustomCard<T> {
    header: string;
    icon: string;
    value: string;
    color: string;
}