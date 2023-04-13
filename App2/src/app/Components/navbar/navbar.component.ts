import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../Services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean = false;
  username: string = '';

  cart: number = 0;
  userEmail: string | null = '';

  panelOpenState = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: Router,
    private spinner: NgxSpinnerService,
    private cookieService: CookieService,
    private _userService: UsersService,
    private _prdService: ProductsService
  ) {}
  ngOnInit() {
    this.checkTheBehaviorSubject();
  }

  checkTheBehaviorSubject() {
    this._userService.getLoggedStatus.subscribe((chk) => {
      console.log('Behavior From Navbar ' + chk);

      this.isUserLogged = chk;
      this._userService
        .getUserName(this.cookieService.get('email_address'))
        .subscribe({
          next: (value) => {
            // console.log(value[0].name);
            this.username = value[0].name;
            // console.log(this.username);

            this._prdService.cartSubjectTotal.subscribe((cardTotal) => {
              this.cart = cardTotal;
              console.log('card total from navbar: ' + this.cart);
            });
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error.detail);
          },
        });
    });
  }

  logoutFun() {
    // new code
    // this._userService.isLoggedSubject.next(false);
    // ________________________________________
    this._prdService.cartSubject.next(0);
    this.cart = 0
    this._userService.isLoggedSubject.next(false);
    this.isUserLogged = false;
    // this.cookieService.deleteAll();
    this.cookieService.delete('access');
    this.cookieService.delete('email_address');
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      this.route.navigate(['/Home']);
    }, 2500);
  }

  // getCartTotal() {
  //   this._prdService
  //     .totalProductCart(this.cookieService.get('email_address'))
  //     .subscribe({
  //       next: (val) => {
  //         console.log(val.length);
  //         this.cart = val.length;
  //         this._prdService.cartSubject.subscribe(cartCount =>{
  //           this.cart = cartCount
  //         })
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err.error);
  //       },
  //     });
  // }

  // Serach Product
  searchByProduct(val:string){

    if(val !== ''){
      this._prdService.searchSubject.next(val)
      this.route.navigate(['/SearchByProductName'])
    }else{
      this.route.navigate(['/Home'])

    }
    // console.log(val);

  }
}
