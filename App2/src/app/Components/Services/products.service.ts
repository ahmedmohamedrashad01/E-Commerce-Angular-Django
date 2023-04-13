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
import { environment } from './../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public cartSubject = new BehaviorSubject<number>(0);
  // public cartSubject: BehaviorSubject<number>
  public searchSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // this.cartSubject = new BehaviorSubject(0);

    this.totalProductCart(this.cookieService.get('email_address')).subscribe({
      next: (val) => {
        console.log('Total Card: ' + val.length);
        this.cartSubject.next(val.length);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });
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

  // working here now 10/4/2023
  getProductsByCatId(id: number, page:number): Observable<any> {
    return this.http
      .get(`${environment.productsByCatId}${id}&page=${page}`, this.httpOptions)
      .pipe(retry(2));
  }

  getAllProducts(page: number): Observable<any> {
    return this.http
      .get(`${environment.apiProduct}${page}`, this.httpOptions)
      .pipe(retry(2));
  }

  getProductById(id: number) {
    return this.http
      .get(`${environment.apiProductByID}${id}`, this.httpOptions)
      .pipe(retry(2));
  }

  addToCartProduct(obj: any): Observable<any> {
    return this.http
      .post<any>(environment.apiCart, obj, this.httpOptionsWithToken)
      .pipe(retry(2));
  }

  editCartProduct(id: number, obj: any): Observable<any> {
    return this.http
      .put<any>(`${environment.apiCart}${id}/`, obj, this.httpOptionsWithToken)
      .pipe(retry(2));
  }

  deleteCartProduct(id: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiCart}${id}/`, this.httpOptionsWithToken)
      .pipe(retry(2));
  }

  totalProductCart(email: string): Observable<any> {
    return this.http
      .get(`${environment.apiCartTotal}${email}`, this.httpOptionsWithToken)
      .pipe(retry(2));
  }

  get cartSubjectTotal() {
    return this.cartSubject.asObservable();
  }

  get searchSubjectAsSubject(){
    return this.searchSubject.asObservable();
  }

  productsByName(prdName:string):Observable<any>{
    return this.http.get<any>(`${environment.apiProductByName}${prdName}`, this.httpOptionsWithToken)
    .pipe(retry(2))

  }
}
