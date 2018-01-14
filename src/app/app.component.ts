import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(knex);
    let me = this;
    let result = me.db.select("*").from("types")
    result.then(function (rows) { console.log(rows) });
    me.ipc.send("mainWindowLoaded")
    me.ipc.on("resultSent", function (evt, result) {
      me.list = [];
      for (var i = 0; i < result.length; i++) {
        me.list.push(result[i].FirstName.toString());
      }
      me.ref.detectChanges()
    });

  }

}
