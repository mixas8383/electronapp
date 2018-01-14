import { Injectable } from '@angular/core';
declare let knex: any;


@Injectable()
export class LdbService {
  public _db = knex;

  constructor() { }
  getData() {
    let self = this;
   
    let result = self._db.select("*").from("types")
    result.then(function (rows) { console.log(rows) });
  }

}
