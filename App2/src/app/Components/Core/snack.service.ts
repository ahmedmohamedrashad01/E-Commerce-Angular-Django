import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Ok') {

    this._snackBar.open(message, action, {
      duration: 2500,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      // panelClass: ['green-snackbar', 'login-snackbar'],
    });
  }

}
