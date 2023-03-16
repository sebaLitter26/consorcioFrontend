/** Datos del usuario que se encuentra logueado actualmente. */
/* export interface LoginInfo {
    id?: number;
    nombre: string;
    legajo: string;
    perfil?: string;
    password?: string;
    //token: string;
    fotoUrl?: string;
    qr?: string;
    permisos?: string[];
    sucursales: number[];
    Usuario: User | null;
    Grupos: Grupo[] | null;
    ERROR: error | null;
    sessionId: string;
}
*/

export interface SignInResponse{
    user: User;
    token: string;
} 




export interface Status{
    id: 1; 
    name: string; 
    __entity: string;
}

export interface User {
    //permisos: Access[];

    createdAt: string;
    deletedAt: string | null;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    photo: string;
    provider: string;
    role: Status | null;
    socialId: string;
    status: Status | null;
    updatedAt: string;
    token: string;
}

/* export interface Perfil extends Profile {
    Permisos: Profile[];
} */

export interface Access {
    modulo: string;
    modulodescripcion: string;
    pages: page[]
}

export interface page {
    create: string;
    delete: boolean;
    descripcion: string;
    idpage: number;
    list: boolean;
    modify: boolean;
    page: string;
    pageurl: string;
    read: boolean;
}


export interface ApiData{
    servidor: string;
    nombre: string;
    version: string;
    framework: string;

}
