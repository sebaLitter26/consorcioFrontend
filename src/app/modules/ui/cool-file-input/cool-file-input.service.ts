import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cloudinary } from ".";

@Injectable()    
export class UploadService {
    constructor( private http: HttpClient ){}

    uploadFile(values: File): Observable<any> {
        const data = new FormData();
        data.append("file", values);
        data.append("upload_preset", `${environment.cloudinaryPreset}`);
        
        return this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinaryName}/upload`, data);
        
    }

    getFile(source: string): Observable<any>{
        return this.http.get(source);
    }

    deleteFile(value: Cloudinary): Observable<any> {
        const data = new FormData();
        data.append("public_id", value.public_id);
        data.append("signature", value.signature);
        //data.append("timestamp", value.);
        data.append("api_key", environment.cloudinaryApiKey);
        //:resource_type/destroy
        return this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinaryName}/${value.resource_type}/destroy`, data);
    }
}