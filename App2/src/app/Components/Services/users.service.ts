import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  retry,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit {
  isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (
      this.cookieService.get('access') &&
      this.cookieService.get('email_address')
    ) {
      this.isLoggedSubject.next(true);
    } else {
      this.isLoggedSubject.next(false);
    }
  }
  ngOnInit() {

    // if (
    //   this.cookieService.get('access') &&
    //   this.cookieService.get('email_address')
    // ) {
    //   this.isLoggedSubject.next(true);
    // } else {
    //   this.isLoggedSubject.next(false);
    // }

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': JWT' + JSON.parse(localStorage.getItem('userdetails')).token
      Authorization: 'JWT ' + this.cookieService.get('access'),
    }),
  };

  createUser(user: any): Observable<any> {
    return (
      this.http
        .post<any>(
          environment.createUserApi,
          JSON.stringify(user),
          this.httpOptions
        )
        // .pipe(retry(2), catchError(this.handleError))
        .pipe(retry(2))
    );
  }

  activateUserAccount(uidToken: any): Observable<any> {
    return this.http
      .post<any>(
        environment.userActivation,
        JSON.stringify(uidToken),
        this.httpOptions
      )
      .pipe(retry(2));
  }

  loginToAccount(user: any): Observable<any> {
    return this.http
      .post<any>(
        environment.loginCreate,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(2));
  }

  loginWithRefresh(refresh: any): Observable<any> {
    return this.http
      .post<any>(
        environment.loginRefresh,
        JSON.stringify(refresh),
        this.httpOptions
      )
      .pipe(retry(2));
  }

  resetPassword(email: any): Observable<any> {
    return this.http
      .post<any>(
        environment.resetPassword,
        JSON.stringify(email),
        this.httpOptions
      )
      .pipe(retry(2));
  }

  confirmPassword(data: any): Observable<any> {
    return this.http
      .post<any>(
        environment.confirmPassword,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(2));
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      // console.log(error.error.message);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //  console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  // is user loged subject
  get getLoggedStatus(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  // getEmilAddressFromApi(mail:string):Observable<any>{

  // }
  getUserName(email: string): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUser}${email}`, this.httpOptionsWithToken)
      .pipe(retry(2));
  }
}
