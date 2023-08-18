import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWlkIiwiaWF0IjoxNjgyMzQyNTM2LCJleHAiOjE2ODI0Mjg5MzZ9.0uPZ3d0XGaMI7_Myy75VybYfOnWTjgsaPVJsFZ4jKUzF3j1BLPMVEBUmdJ0ITyApePTL1I5IJHZBX4iDgvzi2Q';
   let accessToken=req.clone({
    setHeaders:{
      Authorization:'Bearer' +token
    }
   })
   return next.handle(accessToken);
  }
}
