import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class BaseApi{
    private baseUrl = "http://localhost:2000";

    constructor(public http:HttpClient){}

    public getUrl(url: string): string{
        return this.baseUrl + url;
    }
}