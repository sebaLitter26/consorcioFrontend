/** Un proceso dentro del circuito de armado de una reserva. */
//export type Process = "compra" | "picking";

/** El estado de un `Process`. */
//export type ProcessState = "ok" | "nok" | "wip" | "hold";

export interface RRHHResponse {
    data: any;
    status: ResponseStatus;
}

export interface ResponseStatus {
    ok: boolean;
    error: string;
}
/*
export type ResponseStatus = "ok" | "error";

Status: 

 export interface ProcessStateStyle {
    label: string;
    color: string;
    backgroundColor: string;
} */
