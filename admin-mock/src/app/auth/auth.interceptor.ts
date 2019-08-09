import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem('id_token')

        console.log(idToken)

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', idToken)
            })
            return next.handle(cloned)

        } else {
            console.log(next.handle(req))
            return next.handle(req)
        }
    }
}