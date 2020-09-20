import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curd',
  templateUrl: './curd.component.html',
  styleUrls: ['./curd.component.scss']
})

export class CurdComponent implements OnInit {

  private _baseUrl: string;
  public sqlliteDataSource: List<IBlogViewModel>;


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  ngOnInit(): void {
    this.getBlogData();
  }

  public getBlogData(): void {
    this.http.get<List<IBlogViewModel>>(this._baseUrl + 'api/blog/curd').subscribe(x => this.sqlliteDataSource = x);
  }
}


export interface IBlogViewModel {
  BlogId: number;
  Url: string;
  Posts: List<IPost>;
}


export interface IPost {
  PostId: number;
  Title: string;
  Content: string;

  BlogId: number;
  Blog: IBlogViewModel;
}

