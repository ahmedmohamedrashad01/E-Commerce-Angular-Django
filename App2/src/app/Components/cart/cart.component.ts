import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../Services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from '../Services/products.service';
import { Router } from '@angular/router';
import { SnackService } from '../Core/snack.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId: number = 0;
  cartProducts: any[] = [];
  totalCartPrice: number = 0;

  constructor(
    private _user: UsersService,
    private cookieService: CookieService,
    private _prd: ProductsService,
    private router: Router,
    private _snackService: SnackService
  ) {}
  ngOnInit() {
    this._user.getUserName(this.cookieService.get('email_address')).subscribe({
      next: (val) => {
        this.userId = val[0].id;
        console.log(this.userId);
        console.log(val[0].email);
        // console.log(val.email);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });

    this.loadCartProducts();
  }

  loadCartProducts() {
    this.totalCartPrice = 0

    if (this.cookieService.get('email_address')) {
      this._prd
        .totalProductCart(this.cookieService.get('email_address'))
        .subscribe({
          next: (val) => {
            // console.log(val);
            this.cartProducts = val;
            // console.log(this.cartProducts);

            for (let pr of this.cartProducts) {
              // this.totalCartPrice += Number(pr.product.price);
              console.log(pr.totalPrice);

              this.totalCartPrice += Number(pr.totalPrice);
              // // console.log(pr.product.price);
              // console.log(pr.product.price);
              // console.log(typeof pr.product.price);
            }
            // console.log(this.totalCartPrice);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });
    } else {
      this._snackService.openSnackBar('Please login first!');
      this.router.navigate(['/Login']);
    }
  }

  getNewQty(val: any, ordId: number, prdId: number) {
    let obj = {
      product: Number(prdId),
      customer: this.userId,
      complete: false,
      qty: Number(val),
    };

    this._prd.editCartProduct(ordId, obj).subscribe({
      next: (val) => {
        console.log(val);
        this.loadCartProducts();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error.detail);
      },
    });

    // console.log(val);
    console.log('Order Id: ' + ordId);
  }

  deleteItem(id: number) {
    this._prd.deleteCartProduct(id).subscribe({
      next: (val) => {
        console.log(val);
        this.loadCartProducts();
        this._snackService.openSnackBar(
          'Product has been deleted from your cart'
        );

        this._prd.totalProductCart(this.cookieService.get('email_address'))
        .subscribe({
          next: (val) => {
            console.log('Total Card: '+val.length);
            this._prd.cartSubject.next(val.length);

          },
          error: (err: HttpErrorResponse) => {
            console.log(err.error);
          },
        });

      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
        this._snackService.openSnackBar(err.error);
      },
    });
  }

  trackByFun(index: number, prdID: any) {
    return prdID.id;
  }

  // Payment #############################################################################


  onLoadPaymentData(e:any){
    console.log(e);

  }



}
