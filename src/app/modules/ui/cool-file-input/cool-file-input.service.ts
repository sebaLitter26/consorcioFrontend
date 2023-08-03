import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Cloudinary, CoolFile } from ".";
import { EncryptService } from 'src/app/services/encrypt.service';

@Injectable()    
export class UploadService {
    constructor( 
        private http: HttpClient,
        private encryptService: EncryptService, 
    ){}

    uploadFile(value: CoolFile): Observable<any> {
        const data = new FormData();
        data.append("file", value.src);
        //data.append("upload_preset", `${environment.cloudinary.preset}`);

        const timestamp = Math.round(+new Date()/1000);
        data.append("public_id", value.name);
        data.append("timestamp", `${timestamp}`);
        data.append("eager", `w_400,h_300,c_pad|w_260,h_200,c_crop`);
        data.append("api_key", environment.cloudinary.api_key);

        return this.encryptService.getSha1EncryptedCloudinaryStringAsync(`eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=${value.name}&timestamp=${timestamp}`).pipe(
            tap((encryptedSignature: string) => {
                data.append("signature", encryptedSignature);
            }),
            switchMap(encryptedUpload => this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}/upload`, data, {reportProgress:true, observe: 'events',})),
            tap((uploadImageResponse: Cloudinary | any) => uploadImageResponse ),
        );
        
    }

    getFile(source: string): Observable<any>{
        return this.http.get(source);
    }

    deleteFile(value: Cloudinary): Observable<any> {       //result: "ok"  or "Not Found"

        const timestamp = Math.round(+new Date()/1000);
        const data = new FormData();
        data.append("public_id", value.public_id);
        data.append("timestamp", `${timestamp}`);
        data.append("resource_type", value.resource_type);
        data.append("api_key", environment.cloudinary.api_key);

        return this.encryptService.getSha1EncryptedCloudinaryStringAsync(`public_id=${value.public_id}&timestamp=${timestamp}`).pipe(
            tap((encryptedSignature: string) => {
                data.append("signature", encryptedSignature);
            }),
            switchMap(encryptedDestroy => this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}/${value.resource_type}/destroy`, data)),
            tap((destroyImageResponse: any) => destroyImageResponse),
        );
        
    }

    
}