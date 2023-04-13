import { Component } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnackService } from '../../Core/snack.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  userForm: FormGroup;
  constructor(
    private _user: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _snackService: SnackService,

    private _dialogRef: MatDialogRef<ResetPasswordComponent>,
  ){
    this.userForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],

    });
  }
  resetPassword(){
    if(this.userForm.valid){
      this._user.resetPassword({email:this.userForm.value['email']}).subscribe({
        next:(val) =>{
          this._snackService.openSnackBar('Please Check Email Inbox');
          this._dialogRef.close()
          // this.router.navigate(['/Login']);
        },
        error:(err: HttpErrorResponse) =>{
          console.log(err.error);

          this._snackService.openSnackBar(err.error);
        }
      })
    }
  }
}
