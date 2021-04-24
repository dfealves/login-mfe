import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,

    // BrowserAnimationsModule
  ],
  exports: [LoginComponent, FormsModule, ReactiveFormsModule],
  providers: [
  ]
})
export class LoginModule { }
