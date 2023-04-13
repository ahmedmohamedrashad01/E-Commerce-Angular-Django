import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackService } from '../../Core/snack.service';
import { UsersService } from '../../Services/users.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from '../../Services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm: FormGroup;
  constructor(
    private _user: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackService: SnackService,
    private _diaolg: MatDialog,
    private cookieService: CookieService,
    private _prdDisplay: ProductsService,
  ) {
    this.userForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(25),
        ]),
      ],
    });
  }

  login() {
    if (this.userForm.valid) {
      // if (this.userForm.get('password')?.value === this.userForm.get('re_password')?.value) {
      this._user.loginToAccount(this.userForm.value).subscribe({
        next: (value) => {


          this._user.loginWithRefresh({ refresh: value.refresh }).subscribe({
            next: (value) => {

          this.cookieService.set('access', value.access, 30,  '/', undefined,  true, 'Strict');
          this.cookieService.set('email_address', this.userForm.value['email'], 30,  '/', undefined,  true, 'Strict');

          this._user.isLoggedSubject.next(true)

          this._prdDisplay.totalProductCart(this.cookieService.get('email_address'))
          .subscribe({
            next: (val) => {
              console.log('Total Card: '+val.length);
              this._prdDisplay.cartSubject.next(val.length);

            },
            error: (err: HttpErrorResponse) => {
              console.log(err.error);
            },
          });
          

            },
            error: (err: HttpErrorResponse) => {

              this._snackService.openSnackBar(err.error.detail);
            },
          });

          this.spinner.show();

          setTimeout(() => {
            this.spinner.hide();

            // this._snackService.openSnackBar('User added successfully');

            this.router.navigate(['/Home']);
          }, 4000);
        },
        error: (err: HttpErrorResponse) => {
          // console.log(err.error.detail);
          this._snackService.openSnackBar(err.error.detail);
        },
      });
    }
  }

  openDialog() {
    return this._diaolg.open(ResetPasswordComponent);
  }
}
