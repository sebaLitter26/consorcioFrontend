import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { SignInResponse, User } from '../../main';
import { ProfileService } from '../../main/services/profile.service';
import { EncryptService } from 'src/app/services/encrypt.service';
import { environment } from 'src/environments/environment';
import { UserSignIn } from '..';

export const LOCAL_STORAGE_TOKEN: string = "consorcio_token";

@Injectable()
export class AuthenticationService {

    constructor(
        private http: HttpClient,
        private profileService: ProfileService,
        private encryptService: EncryptService,
    ) { }

    /**
     * Inicia sesión con un usuario.
     * @param username el legajo del usuario
     * @param password la password del usuario
     * @returns un `Observable` con un `SignInResponse` que tiene toda la información del usuario
     */
     signIn(username: string, password: string): Observable<SignInResponse> {
        const userSignIn: UserSignIn = {
            email: username,
            password,
        }

        return this.encryptService.getBase64EncryptedStringAsync(password).pipe(
            tap(encryptedPassword => {
                //userSignIn.password = encryptedPassword;
            }),
            switchMap(encryptedPassword => this.http.post<SignInResponse>(`${environment.apiUrl}auth/email/login`, userSignIn)),
            tap((signInResponse: SignInResponse) => {
                localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.token ?? "");
                this.profileService.setupUser(signInResponse.user);
            }),
        );
    }

    /**
     * Inicia sesión con el token del usuario.
     * @returns un `Observable` con un `SignInResponse` que tiene toda la información del usuario
     */
     tokenSignIn(): Observable<SignInResponse> {
        const savedToken: string | null = localStorage.getItem(LOCAL_STORAGE_TOKEN);
        const headers: HttpHeaders = new HttpHeaders()
            .append('Cache-Control', 'no-store')
            .append('Content-Type', 'application/json; charset=utf-8')
            .append('Type', 'web')
            .append('Authorization', `Bearer ${savedToken}`);
            
        return this.http.get<SignInResponse>(`${environment.apiUrl}auth/authToken`, {
            'headers': headers,
        }).pipe(
            tap((signInResponse: SignInResponse) => {
                //console.log(signInResponse);
                
                localStorage.setItem(LOCAL_STORAGE_TOKEN, signInResponse.token ?? "");
                this.profileService.setupUser({...signInResponse.user, token: signInResponse.token});
            }),
        );
    }

    /**
     * Obtiene el string a utlizar en la primera creación del QR. No se utiliza en los casos posteriores. Para eso, @see reprintQR()
     * @returns String a utilizar en la generación del QR
     */
    getFirstQR() {
        return this.http.post(`${environment.apiUrl}login/Generarqr`, {});
    }


    /**
* Obtiene el string a utlizar posteriormente a la primera creación del QR. No se utiliza en el caso base. Para eso, @see getFirstQR()
* @returns String a utilizar en la generación del QR
*/
    reprintQR() {
        return this.http.get(`${environment.apiUrl}login/Reimprimirqr`);

    }


}
