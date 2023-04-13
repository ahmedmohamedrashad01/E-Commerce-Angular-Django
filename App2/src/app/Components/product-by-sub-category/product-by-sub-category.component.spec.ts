import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBySubCategoryComponent } from './product-by-sub-category.component';

describe('ProductBySubCategoryComponent', () => {
  let component: ProductBySubCategoryComponent;
  let fixture: ComponentFixture<ProductBySubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBySubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBySubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
