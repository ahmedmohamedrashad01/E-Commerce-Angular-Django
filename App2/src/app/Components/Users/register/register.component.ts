import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackService } from '../../Core/snack.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userForm: FormGroup;
  constructor(
    private _user: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackService: SnackService
  ) {
    this.userForm = fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(25),
        ]),
      ],
      re_password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(25),
        ]),
      ],
    });
  }

  onFormSubmit() {
    let pass = this.userForm.get('password')?.value;
    let re_pass = this.userForm.get('re_password')?.value;

    if (this.userForm.valid) {
      // if (this.userForm.get('password')?.value === this.userForm.get('re_password')?.value) {
        // this.spinner.show();
      this._user.createUser(this.userForm.value).subscribe({
        next: (value) => {
          // console.log(value);

          this.spinner.show();

          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.spinner.hide();

            this._snackService.openSnackBar('User added successfully');

            this.router.navigate(['/Login']);
          }, 3500);
        },
        error: (err: HttpErrorResponse) => {
          if (pass !== re_pass) {
            this._snackService.openSnackBar('Passwords are not Matches!');
          }
          // _______________________________________________________________________
          else if (err.error['email']) {
            this._snackService.openSnackBar(err.error['email'][0]);
            // console.log(err.error.email);
          } else if (err.error['password']) {
            if (err.error['password'].length == 2) {
              let passError =
                err.error['password'][0] + err.error['password'][1];
              this._snackService.openSnackBar(passError);
            } else if (err.error['password'].length == 1) {
              if (err.error['password'][0] != undefined) {
                this._snackService.openSnackBar(err.error['password'][0]);
              }else{
                this._snackService.openSnackBar(err.error['password'][1]);

              }
            }

          }
          // ______________________________________________________________________

          // else {
          //   this._snackService.openSnackBar(JSON.stringify(err.error));
          // }
        },

      });
    }
  }
}
