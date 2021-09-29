import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from './components/layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
