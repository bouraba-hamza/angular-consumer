import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import {ScrollModule} from './scroll/scroll.module';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NotfoundComponent} from "./auth/notfound/notfound.component";
import {AuthGuard} from "./auth/auth.guard";
import {AuthService} from "./auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CheckConnectivityComponent} from "./check-connectivity/check-connectivity.component";
import {JwtInterceptor} from "./jwt-interceptor";
import {AgendaModule} from "./agenda/agenda.module";
import {ProduitsModule} from "./produits/produits.module";
import {LockScreenComponent} from "./authentication/lock-screen/lock-screen.component";
import {WithSocialComponent} from "./authentication/login/with-social/with-social.component";
//import { NgxPaginationModule } from 'ngx-pagination';
import {PaginationComponent} from "./pagination/pagination.component";






@NgModule({
  declarations: [
    NotfoundComponent,
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BreadcrumbsComponent,
    CheckConnectivityComponent,
    TitleComponent,
      LockScreenComponent,
      WithSocialComponent,
      PaginationComponent



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    ScrollModule,
    ReactiveFormsModule,


  ],
  exports: [ScrollModule],
  providers: [

      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      { provide: LocationStrategy, useClass: PathLocationStrategy},
       AuthGuard,AuthService
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

    bootstrap: [AppComponent]
})
export class AppModule {}
