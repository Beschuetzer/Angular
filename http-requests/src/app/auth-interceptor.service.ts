import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";


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

    //param req object is immutable, so modifying a req requires .clone({someProp: newValue}) Warning: must return this modifiedReq in next.handle() below:
    const modifiedReq = req.clone({headers: req.headers.append('interceptionAppendedHeader', 'Intercepted!!')});
    
    //NOTE: lets the request continue (without it, request will terminate)
    return next.handle(modifiedReq).pipe(
      tap(httpResponseEvent => {
        console.log('httpResponse =', httpResponseEvent);
        if (httpResponseEvent.type === HttpEventType.Response) {
          console.log('response is of type response------------------------------------------------');
        }
      })
    );
  }
}