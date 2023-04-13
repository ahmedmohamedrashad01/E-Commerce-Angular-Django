import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../Services/products.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-by-sub-category',
  templateUrl: './product-by-sub-category.component.html',
  styleUrls: ['./product-by-sub-category.component.css'],
})
export class ProductBySubCategoryComponent implements OnInit {
  prdId: number = 0;
  productsByCatId: any[] = [];

  page: number = 1;
  hasMore: boolean = true;


  constructor(
    private activatedRout: ActivatedRoute,
    private _prdDisplay: ProductsService
  ) {}
  ngOnInit(): void {
   this.loadProdcuts();
  }

  loadProdcuts(){
    this.prdId = Number(this.activatedRout.snapshot.paramMap.get('id'));
    this._prdDisplay.getProductsByCatId(this.prdId, this.page).subscribe({
      next: (data) => {
        // console.log(res);
        // let { results } = res;
        // this.productsByCatId = results;
        // this.productsByCatId;
        // console.log(this.productsByCatId);
        this.productsByCatId.push(...data.results);
        this.hasMore = !!data.next;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.error);
      },
    });

    // console.log('Products' + this.productsByCatId);
  }
  loadMore() {
    this.page++;
    this.loadProdcuts();

  //  this.productEelem.nativeElement.scrollTop = '15px'
  }

  // loadMore() {
  //   this.page++;
  //   this.loadProdcuts();

  // }

  trackByFun(index:number, prd:any){
    return prd.id
  }
}
