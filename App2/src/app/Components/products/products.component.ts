import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from '../Core/snack.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from '../Services/categories.service';
import { UsersService } from '../Services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  username: string = '';
  userID: number = 0;

  id: number = 0;
  name: string = '';
  description: string = '';
  first_image: string = '';
  second_image: string = '';
  third_image: string = '';
  fourth_image: string = '';
  price: number = 0;

  imgChange: string = '';
  constructor(
    private _prdDisplay: ProductsService,
    private activatedRouter: ActivatedRoute,
    private _snackService: SnackService,
    private _userService: UsersService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  ngOnInit() {
    let id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    // display Sub Category By ID
    this._prdDisplay.getProductById(id).subscribe({
      next: (data: any) => {
        // let {results} = data
        // let{id,name} = results[0]
        // console.log(results[0]);
        // console.log(id);
        // console.log(name);

        let { results } = data;
        let {
          id,
          name,
          description,
          price,
          first_image,
          second_image,
          third_image,
          fourth_image,
        } = results[0];
        // console.log(results[0]);
        // console.log(id);
        // console.log(name);
        // console.log(description);
        // console.log(price);

        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.first_image = first_image;
        this.second_image = second_image;
        this.third_image = third_image;
        this.fourth_image = fourth_image;

        this.imgChange = this.first_image;
      },
      error: (err: HttpErrorResponse) => {
        this._snackService.openSnackBar('Opps... Product Does Not Exist!');
      },
    });

    this._userService
      .getUserName(this.cookieService.get('email_address'))
      .subscribe({
        next: (value) => {
          // console.log(value[0].name);
          this.username = value[0].name;
          this.userID = value[0].id;
          console.log(this.username);
          console.log(this.userID);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.detail);
        },
      });
  }

  changeImage(src: string) {
    this.imgChange = src;
    console.log(this.imgChange);
  }

  addToCart() {

    if(this.cookieService.get('email_address')){
      let obj = {
        product: this.id,
        customer: this.userID,
        complete: false,
        qty: 1,
      };
      this._prdDisplay.addToCartProduct(obj).subscribe({
        next: (val) => {
          // console.log(val);

          this._prdDisplay
            .totalProductCart(this.cookieService.get('email_address'))
            .subscribe({
              next: (val) => {
                console.log('Total Card: ' + val.length);
                this._prdDisplay.cartSubject.next(val.length);
              },
              error: (err: HttpErrorResponse) => {
                console.log(err.error);
              },
            });

          this._snackService.openSnackBar('Product has been added to your cart');
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this._snackService.openSnackBar('Opps... please try again');
        },
      });
    }else{
      this._snackService.openSnackBar('Please login first!');
      this.router.navigate(['/Login'])
    }


  }
}
