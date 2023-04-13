import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // Get All Categories
  getAllCategories(): Observable<any> {
    return this.http
      .get<any>(environment.apiCategory, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // _________________________________________________________

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);

    return throwError(() => {
      return errorMessage;
    });
  }

  getSubCategoryById(id: number): Observable<any> {
    return this.http
      .get(`${environment.apiSubCategory}${id}`,this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
