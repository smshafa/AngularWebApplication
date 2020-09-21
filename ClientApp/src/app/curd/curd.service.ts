import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogViewModel } from './curd.component';

@Injectable()
export class CurdService {
  private _baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public getAllBlogs(): Observable<BlogViewModel[]> {
    return this.http.get<BlogViewModel[]>(this._baseUrl + 'api/blog');
  }

}
