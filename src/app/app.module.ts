import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxElectronModule} from 'ngx-electron';


import { AppComponent } from './app.component';
import {LdbService} from './services/ldb.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [LdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
