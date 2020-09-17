"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpInterceptorProviders = void 0;
/* "Barrel" of Http Interceptors */
var http_1 = require("@angular/common/http");
var auth_interceptor_service_1 = require("../app/authentication/auth-interceptor.service");
/** Http interceptor providers in outside-in order */
exports.httpInterceptorProviders = [
    { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_service_1.AuthInterceptorService, multi: true },
];
//# sourceMappingURL=index.js.map