import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-search-by-product-name',
  templateUrl: './search-by-product-name.component.html',
  styleUrls: ['./search-by-product-name.component.css'],
})
export class SearchByProductNameComponent implements OnInit {
  searchValue: string = '';
  products: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _prd: ProductsService
  ) {}
  ngOnInit() {
    //   this.searchValue += this.activatedRoute.snapshot.paramMap.get('prdName')
    //  console.log('from search: '+this.searchValue );
    this._prd.searchSubjectAsSubject.subscribe((val) => {
      console.log(val);
      this._prd.productsByName(val).subscribe({
        next: (data) => {
          let { results } = data;
          console.log(results);
          this.products = results
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
        },
      });
    });
  }

  trackByFun(index: number, prdID: any) {
    return prdID.id;
  }
}
