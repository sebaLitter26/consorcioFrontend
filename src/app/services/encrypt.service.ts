import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class EncryptService {
    
    constructor() {}

    /**
     * Toma un texto plano y devuelve un texto encriptado como un `string` en base64.
     * @param plainText el texto a encriptar (plaintext)
     * @returns el texto en base64 encriptado con RSA (cyphertext)
    */
    getBase64EncryptedStringAsync(plainText: string): Observable<string> {
        return from(import('node-forge')).pipe(
            switchMap(forge => of(window.btoa(forge.pki.publicKeyFromPem('').encrypt(plainText))))
        );
    }
    

    getSha1EncryptedCloudinaryStringAsync(unique_name: string): Observable<string> {
        return from(import('node-forge')).pipe(
            switchMap(forge => of(forge.sha1.create().update(`${unique_name}${environment.cloudinary.api_secret}`).digest().toHex())
        ));
    }

   
}