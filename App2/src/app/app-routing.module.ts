import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/Users/login/login.component';
import { RegisterComponent } from './Components/Users/register/register.component';
import { ResetPasswordComponent } from './Components/Users/reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './Components/Users/confirm-password/confirm-password.component';
import { ProductsComponent } from './Components/products/products.component';
import { ActivateComponent } from './Components/Users/activate/activate.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductBySubCategoryComponent } from './Components/product-by-sub-category/product-by-sub-category.component';
import { CartComponent } from './Components/cart/cart.component';
import { SearchByProductNameComponent } from './Components/search-by-product-name/search-by-product-name.component';

const routes: Routes = [

  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Product/:id', component: ProductsComponent },
  { path: 'SubCategory/:id', component: SubCategoryComponent },

  { path: 'ProductsBySub/:id', component: ProductBySubCategoryComponent },

  { path: 'Cart', component: CartComponent },
  { path: 'SearchByProductName', component: SearchByProductNameComponent },

  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'activate/:uid/:token', component: ActivateComponent },
  { path: 'Reset-Password', component: ResetPasswordComponent },
  { path: 'password/reset/confirm/:uid/:token', component: ConfirmPasswordComponent },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
