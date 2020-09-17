import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IRedis {
  Key: string,
  Value: string
}

export class Redis implements IRedis {
  Key: string;
  Value: string;
}

export abstract class RedisServiceBase {

  constructor() {}

  abstract getRows(): Observable<IRedis[]>;
  abstract insertRow(redis: IRedis);
}


@Injectable({
  providedIn: 'root'
})
export class RedisService extends RedisServiceBase{

  private _baseUrl: string;  

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super();
    this._baseUrl = baseUrl;    
  }

  public getRows(): Observable<IRedis[]> {    
    return this.http.get<IRedis[]>(this._baseUrl + 'api/cache/getall');
  }

  public insertRow(redis: IRedis) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(redis);
    this.http.post<IRedis>(this._baseUrl + 'api/cache', body, { 'headers': headers })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

}
