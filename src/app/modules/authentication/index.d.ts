
export interface UserSignIn {
    email: string | null;
    password: string | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
    isActive: boolean;
    userId: string;  // usuario que creo este usuario.
    lastUpdateBy: string; 
}

export interface RegisterResult {
    status: boolean;
    message: string;
    user?: User;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}