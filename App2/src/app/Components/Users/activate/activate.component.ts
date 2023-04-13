import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../Services/users.service';

import { HttpErrorResponse } from '@angular/common/http';
import { SnackService } from '../../Core/snack.service';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _user: UsersService,
    private spinner: NgxSpinnerService,
    private _snackService: SnackService
  ) // @Inject(String) private uid: any,
  // @Inject(String) private token: any
  {}

  ngOnInit(): void {
    let uid = this.activatedRoute.snapshot.paramMap.get('uid');
    let token = this.activatedRoute.snapshot.paramMap.get('token');
    // console.log(uid);
    // console.log(token);

    // let uidToken = {
    //   uid: uid,
    //   token: token,
    // };

    this._user.activateUserAccount({ uid, token }).subscribe({
      next: (val) => {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          this._snackService.openSnackBar('User Activated Successfully');

          this.router.navigate(['/Login']);
        }, 4000);
      },
      error: (err: HttpErrorResponse) => {
        // this.spinner.show();
        console.log(err.error.detail);
        this._snackService.openSnackBar(err.error.detail);
      },
    });


  }
}
