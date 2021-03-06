import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RedisComponent } from './redis/redis.component';

// Imports an individual widget
//import { DxDataGridModule } from "devextreme-angular";

// Imports all the DevExtreme widgets
import { DevExtremeModule } from "devextreme-angular"; 
import { httpInterceptorProviders } from '../http-interceptors';
import { AuthService } from './authentication/auth.service';
import { CurdComponent } from './curd/curd.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RedisComponent,
    CurdComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'redis', component: RedisComponent },
      { path: 'curd', component: CurdComponent },
    ]),
    //DxDataGridModule,
    DevExtremeModule
  ],
  providers: [
    AuthService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
