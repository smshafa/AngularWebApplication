///// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule } from "@angular/platform-browser";
import { RedisComponent } from './redis.component';
import { RedisService, IRedis, RedisServiceBase } from './redis.service';
import { DevExtremeModule } from 'devextreme-angular'
import { Observable, Observer } from 'rxjs';


// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//https://stackoverflow.com/questions/42401618/angular2-jasmine-spyon-method-does-not-exist
//https://stackoverflow.com/questions/40021366/mocking-service-in-a-component-mock-ignored
//https://stackoverflow.com/questions/56652121/error-expected-spy-create-to-have-been-called
//https://dotnetcorecentral.com/blog/redis-cache-in-net-core-docker-container/
//https://stackoverflow.com/questions/40358858/angular-2-with-jasmine-test-component-with-injected-service

let mockData = [
  {
    Key: 'testBed1',
    Value: 'testBed1'
  },
  {
    Key: 'testBed2',
    Value: 'testBed2'
  },
  {
    Key: 'testBed3',
    Value: 'testBed3'
  }
];

//let fakeHttpClient: HttpClient;
//const BASE_URL = new InjectionToken<string>('BASE_URL');
//providers: [{ provide: BASE_URL, useValue: "http://example.com/api" }]
//const BASE_URL = new OpaqueToken('app.url');

//class MockRedisService extends RedisServiceBase {

//  constructor() {
//    super();
//  }

//  public insertRow(redis: IRedis) {
//    throw new Error("Method not implemented.");
//  }

//  public getRows(): Observable<IRedis[]> {
//    return Observable.create((observer: Observer<IRedis[]>) => {
//      observer.next(mockData);
//    });
//  }

//}



class MockRedisService extends RedisService {

  constructor() {
    super(null, null);
  }

  public insertRow(redis: IRedis) {
    throw new Error("Method not implemented.");
  }

  public getRows(): Observable<IRedis[]> {
    return Observable.create((observer: Observer<IRedis[]>) => {
      observer.next(mockData);
    });
  }

}



describe('redis component', () => {



  

  //let httpClient: HttpClient;
  //let httpTestingController: HttpTestingController;    
  //let service;


  let component: RedisComponent;
  let fixture: ComponentFixture<RedisComponent>;
  let service: RedisService;
  let mySpy: jasmine.Spy<() => Observable<IRedis[]>>;

  beforeEach(async(() => {


    // Create jasmine spy object 
    //let redisServiceSpy = jasmine.createSpyObj({ getRows: null });
    // Provide the dummy/mock data to sortNumberData method.
    

    TestBed.configureTestingModule({
      declarations: [RedisComponent],
      imports: [BrowserModule, DevExtremeModule],//, HttpClientTestingModule],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: RedisService, useClass: MockRedisService }//,
        //{ provide: BASE_URL, useValue: 'base url' }//,
        //InjectionToken 
      ]
    //}).compileComponents();
    }).overrideComponent(RedisComponent, {
      set: {
        providers: [
          { provide: RedisService, useClass: MockRedisService },
        ]
      }
    }).compileComponents();
  

    // Inject the http service and test controller for each test
    //httpClient = TestBed.get(HttpClient);
    //httpTestingController = TestBed.get(HttpTestingController);

    //service = TestBed.get(RedisService);    
    //mySpy = spyOn(service, 'getRows').and.callThrough();
  }));

  beforeEach(() => {
    //service = TestBed.get(RedisService);
    //let mySpy = spyOn(service, 'getRows').and.callThrough();
    fixture = TestBed.createComponent(RedisComponent);    
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(RedisService);
    mySpy = spyOn(service, 'getRows').and.callThrough();
    
  });

//  service = TestBed.get(RedisService);

  it('should do something', async(() => {
    expect(true).toEqual(true);
  }));

  it('should make a call to redisService.getAll()', async(() => {

    //let myService = TestBed.get(RedisService);
    //let mySpy = spyOn(service, 'getRows').and.callThrough();
    //spyOn(myService, 'getRows').and.callThrough();

    spyOn(component, 'getAllRows').and.callThrough();
    component.getAllRows();
    expect(component.getAllRows).toHaveBeenCalled();

    //expect(mySpy).toBeDefined();
    //expect(mySpy).toBeDefined();
    expect(mySpy).toHaveBeenCalledTimes(1); 
    //expect(mySpy).toHaveBeenCalled();
    //expect(myService.getRows).toHaveBeenCalled();
  }));


});
