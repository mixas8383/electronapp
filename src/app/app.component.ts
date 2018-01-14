import { Component, ChangeDetectorRef } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {LdbService} from './services/ldb.service';
//import{knex} from 'knex';
declare let electron: any;
declare let knex: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  public title = 'my app';
  public ipc = electron.ipcRenderer;
  public list: Array<string>;
  public db = knex;

  constructor(private ref: ChangeDetectorRef
    ,private _electronService: ElectronService
    ,private ldbService: LdbService
  ) { }

  ngOnInit() {
    console.log(knex);
    let self = this;
  self.ldbService.getData();
    //console.log(self._electronService);
    // let result = self.db.select("*").from("types")
    // result.then(function (rows) { console.log(rows) });
    self.ipc.send("mainWindowLoaded")
    // self.ipc.on("resultSent", function (evt, result) {
    //   self.list = [];
    //   for (var i = 0; i < result.length; i++) {
    //     self.list.push(result[i].FirstNaself.toString());
    //   }
    //   self.ref.detectChanges()
    // });

  }

}
