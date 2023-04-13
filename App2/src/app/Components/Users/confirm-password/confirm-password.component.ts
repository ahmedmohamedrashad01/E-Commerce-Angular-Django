import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackService } from '../../Core/snack.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
})
export class ConfirmPasswordComponent implements OnInit {
  userForm: FormGroup;
  private uid: any = '';
  private token: any = '';
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _user: UsersService,
    private fb: FormBuilder,

    private spinner: NgxSpinnerService,
    private _snackService: SnackService
  ) {
    this.userForm = fb.group({
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
  ngOnInit() {
    this.uid = this.activateRoute.snapshot.paramMap.get('uid');
    this.token = this.activateRoute.snapshot.paramMap.get('token');
    console.log(this.uid);
    console.log(this.token);
  }

  saveNewPassword() {
    if (this.userForm.valid) {
      let obj = {
        uid: this.uid,
        token: this.token,
        new_password: this.userForm.value['password'],
      };
      this._user.confirmPassword(obj).subscribe({
        next: (value) => {
          this._snackService.openSnackBar('Password Has Been Changed');
          this.router.navigate(['/Login'])
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this._snackService.openSnackBar(err.error);
        },
      });
    }
  }
}
