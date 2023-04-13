import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from './../Services/categories.service';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ProductsService } from '../Services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackService } from '../Core/snack.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allCat!: any[];
  products: any = [];
  page: number = 1;
  hasMore: boolean = true;


  constructor(
    private _categories: CategoriesService,
    private _products: ProductsService,
    private router: Router,
    private _snackService: SnackService,
    private cookieService: CookieService,
    private _userService: UsersService,
  ) {}


  ngOnInit() {


    this.allCategories();
    this.loadProdcuts();

  }

  allCategories() {
    this._categories.getAllCategories().subscribe({
      next: (data) => {
        // console.log(data);
        this.allCat = data;
        console.log(this.allCat);
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  // onNavigateFun($event: MatTabChangeEvent) {
  //   let catId = this.allCat[$event.index].id;
  //   this.router.navigate(['/SubCategory', catId]);
  //   console.log(this.allCat[$event.index].id);
  // }

  onNavigateFun2(catId:number){
    this.router.navigate(['/SubCategory', catId]);
  }
  loadProdcuts() {
    this._products.getAllProducts(this.page).subscribe({
      next: (data) => {
        this.products.push(...data.results);
        this.hasMore = !!data.next;
        // console.log(data.next);

      },
      error: (err: HttpErrorResponse) => {
        this._snackService.openSnackBar(err.error);
      },
    });
  }

  loadMore() {
    this.page++;
    this.loadProdcuts();

  //  this.productEelem.nativeElement.scrollTop = '15px'
  }


  trackByFun(index: number, prdID: any) {
    return prdID.id;
  }
}
