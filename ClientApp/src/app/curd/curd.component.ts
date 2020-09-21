import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurdService } from './curd.service';

@Component({
  selector: 'app-curd',
  templateUrl: './curd.component.html',
  styleUrls: ['./curd.component.scss'],
  providers:  [ CurdService ]
})

export class CurdComponent implements OnInit {

  public sqlliteDataSource: BlogViewModel[];


  constructor(private curdService: CurdService) {
  }

  ngOnInit(): void {
    this.getBlogData();
  }

  public getBlogData(): void {
    this.curdService.getAllBlogs().subscribe(response => this.sqlliteDataSource = response);
  }
}

export interface BlogViewModel {
  BlogId: number;
  PostId: number;
  Url: string
  Title: string
  Content: string
}

