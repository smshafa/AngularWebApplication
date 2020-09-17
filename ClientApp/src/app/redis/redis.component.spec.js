"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
///// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var redis_component_1 = require("./redis.component");
var redis_service_1 = require("./redis.service");
var devextreme_angular_1 = require("devextreme-angular");
var rxjs_1 = require("rxjs");
//https://stackoverflow.com/questions/42401618/angular2-jasmine-spyon-method-does-not-exist
//https://stackoverflow.com/questions/40021366/mocking-service-in-a-component-mock-ignored
//https://stackoverflow.com/questions/56652121/error-expected-spy-create-to-have-been-called
//https://dotnetcorecentral.com/blog/redis-cache-in-net-core-docker-container/
//https://stackoverflow.com/questions/40358858/angular-2-with-jasmine-test-component-with-injected-service
var mockData = [
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
var MockRedisService = /** @class */ (function (_super) {
    __extends(MockRedisService, _super);
    function MockRedisService() {
        return _super.call(this, null, null) || this;
    }
    MockRedisService.prototype.insertRow = function (redis) {
        throw new Error("Method not implemented.");
    };
    MockRedisService.prototype.getRows = function () {
        return rxjs_1.Observable.create(function (observer) {
            observer.next(mockData);
        });
    };
    return MockRedisService;
}(redis_service_1.RedisService));
describe('redis component', function () {
    //let httpClient: HttpClient;
    //let httpTestingController: HttpTestingController;    
    //let service;
    var component;
    var fixture;
    var service;
    var mySpy;
    beforeEach(testing_1.async(function () {
        // Create jasmine spy object 
        //let redisServiceSpy = jasmine.createSpyObj({ getRows: null });
        // Provide the dummy/mock data to sortNumberData method.
        testing_1.TestBed.configureTestingModule({
            declarations: [redis_component_1.RedisComponent],
            imports: [platform_browser_1.BrowserModule, devextreme_angular_1.DevExtremeModule],
            providers: [
                { provide: testing_1.ComponentFixtureAutoDetect, useValue: true },
                { provide: redis_service_1.RedisService, useClass: MockRedisService } //,
                //{ provide: BASE_URL, useValue: 'base url' }//,
                //InjectionToken 
            ]
            //}).compileComponents();
        }).overrideComponent(redis_component_1.RedisComponent, {
            set: {
                providers: [
                    { provide: redis_service_1.RedisService, useClass: MockRedisService },
                ]
            }
        }).compileComponents();
        // Inject the http service and test controller for each test
        //httpClient = TestBed.get(HttpClient);
        //httpTestingController = TestBed.get(HttpTestingController);
        //service = TestBed.get(RedisService);    
        //mySpy = spyOn(service, 'getRows').and.callThrough();
    }));
    beforeEach(function () {
        //service = TestBed.get(RedisService);
        //let mySpy = spyOn(service, 'getRows').and.callThrough();
        fixture = testing_1.TestBed.createComponent(redis_component_1.RedisComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(redis_service_1.RedisService);
        mySpy = spyOn(service, 'getRows').and.callThrough();
    });
    //  service = TestBed.get(RedisService);
    it('should do something', testing_1.async(function () {
        expect(true).toEqual(true);
    }));
    it('should make a call to redisService.getAll()', testing_1.async(function () {
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
//# sourceMappingURL=redis.component.spec.js.map