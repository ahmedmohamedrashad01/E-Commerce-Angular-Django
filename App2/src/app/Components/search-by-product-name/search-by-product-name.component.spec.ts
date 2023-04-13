import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByProductNameComponent } from './search-by-product-name.component';

describe('SearchByProductNameComponent', () => {
  let component: SearchByProductNameComponent;
  let fixture: ComponentFixture<SearchByProductNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByProductNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByProductNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
