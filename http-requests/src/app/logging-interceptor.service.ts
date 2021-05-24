import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(
      'logging intercepter------------------------------------------------'
    );

    return next.handle(req).pipe(tap((httpResponseEvent) => {
      if (httpResponseEvent.type === HttpEventType.Response) {
        console.log('incoming respnose from interceptor:------------------------------------------------', httpResponseEvent);
      }
    }));
  }
}
