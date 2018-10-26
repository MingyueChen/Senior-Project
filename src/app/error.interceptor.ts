import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor (private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert ('Login failed!\nEmail address or password was entered incorrectly.');
        } else if (error.status === 500) {
          alert ('Signup failed!\nEmail address has been used already.');
        }
      // this.dialog.open(ErrorComponent);
        return throwError(error);
      })
    );
  }
} // end of class
