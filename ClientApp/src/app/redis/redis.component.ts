import { Component, OnInit } from '@angular/core';
import { IRedis, Redis, RedisService } from './redis.service';

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.scss'],
  providers:  [ RedisService ]
})
export class RedisComponent implements OnInit {
  public redisDataSource: IRedis[];
  // private _redis: RedisService;
  public Title: string = "Redis";

  constructor(private redis: RedisService) {
    // this._redis = redis;

    // redis.getRows().subscribe(result => this.redisDataSource = result);
  }

  ngOnInit() {
    this.getAllRows();
  }

  public getAllRows() {
    this.redis.getRows().subscribe(result => this.redisDataSource = result);
  }

  public onRowInserting(e) {
    const redisRow: IRedis = new Redis();
    redisRow.Key = e.data.Key;
    redisRow.Value = e.data.Value;
    this.redis.insertRow(redisRow);
  }
}




