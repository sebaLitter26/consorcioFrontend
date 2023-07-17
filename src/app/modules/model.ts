

/** Un proceso dentro del circuito de armado de una reserva. */
//export type Process = "compra" | "picking";

/** El estado de un `Process`. */
export type ProcessState = "ok" | "nok" | "wip" | "hold";

export interface RRHHResponse {
    data: any;
    status: ResponseStatus;
}

export interface ResponseStatus {
    ok: boolean;
    error: string;
}

export interface ProcessStateStyle {
    label: string;
    color: string;
    backgroundColor: string;
}

export const PROCESS_STATES_MAP: {[keys in ProcessState]: ProcessStateStyle} = {
    wip: {
        backgroundColor: "var(--color-wip)",
        color: "white",
        label: "WIP",
    },
    hold: {
        backgroundColor: "var(--color-hold)",
        color: "white",
        label: "HOLD",
    },
    ok: {
        backgroundColor: "var(--color-ok)",
        color: "white",
        label: "OK",
    },
    nok: {
        backgroundColor: "var(--color-nok)",
        color: "white",
        label: "NOK",
    }
}

