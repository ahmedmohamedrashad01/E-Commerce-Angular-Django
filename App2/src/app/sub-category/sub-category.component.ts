import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackService } from '../Components/Core/snack.service';
import { CategoriesService } from '../Components/Services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  products: any[] = [];
  constructor(

    private activatedRouter: ActivatedRoute,
    private _snackService: SnackService,
    private _subCategory:CategoriesService
  ) {}

  ngOnInit() {
    let id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    // display Sub Category By ID
    this._subCategory.getSubCategoryById(id).subscribe({
      next: (res) => {
        this.products = res;
        // console.log(this.products);
      },
      error: (err:HttpErrorResponse) => {
        this._snackService.openSnackBar('Opps... Category Does Not Exist!');


      },
    });
  }

}
