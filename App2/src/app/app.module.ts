import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxImageZoomModule } from 'ngx-image-zoom';

import { NgxTypedJsModule } from 'ngx-typed-js';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/Users/login/login.component';
import { RegisterComponent } from './Components/Users/register/register.component';
import { ResetPasswordComponent } from './Components/Users/reset-password/reset-password.component';
import { ConfirmPasswordComponent } from './Components/Users/confirm-password/confirm-password.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { ProductsComponent } from './Components/products/products.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ActivateComponent } from './Components/Users/activate/activate.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductBySubCategoryComponent } from './Components/product-by-sub-category/product-by-sub-category.component';
import { CartComponent } from './Components/cart/cart.component';
import { SearchByProductNameComponent } from './Components/search-by-product-name/search-by-product-name.component';

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ConfirmPasswordComponent,
    NavbarComponent,
    ProductsComponent,
    ActivateComponent,
    SubCategoryComponent,
    ProductBySubCategoryComponent,
    CartComponent,
    SearchByProductNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FlexLayoutModule,
    NgxImageZoomModule,
    NgxTypedJsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatTabsModule,
    GooglePayButtonModule,
    TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
    }
    }),

  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n','.json');
}
