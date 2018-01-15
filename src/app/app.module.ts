import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxElectronModule} from 'ngx-electron';


import { AppComponent } from './app.component';
import {LdbService} from './services/ldb.service';
import { PlasticComponent } from './plastic/plastic.component';



@NgModule({
  declarations: [
    AppComponent,
    PlasticComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule
  ],
  providers: [LdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
