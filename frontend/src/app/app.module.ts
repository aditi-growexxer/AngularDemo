import { NgModule } from '@angular/core';  // This is the important import
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';  // HttpClientModule for HTTP requests
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add this here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

