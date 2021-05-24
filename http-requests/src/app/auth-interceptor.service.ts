import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


//NOTE: you have to add the following object to the app.module.ts providers array (for each interceptor you use):
// {
//   provide: HTTP_INTERCEPTORS, 
//   useClass: AuthInterceptorService,
//   multi: true, //telling angular you have multiple interceptors
// }


//Note: Interceptors are used to intercept HttpRequests and do/add something to them (i.e. a header or param)
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('request intercepted------------------------------------------------');
    //Note: Use req to filter when to apply which logic based on what the request url is for example or the params, etc.
    console.log('req =', req);
    
    //NOTE: lets the request continue (without it, request will terminate)
    return next.handle(req);
  }
}