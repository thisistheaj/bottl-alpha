import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Bottls provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Bottls {
  bottls: any[];

  constructor(public http: Http) {
    console.log('Hello Bottls Provider');
  }

  get(){
    return this.bottls;
  }

  pullBottls(position){
    // this.bottls.push();
  }

  sendBottl(bottl){
    alert('sending: ' + JSON.stringify(bottl));
  }
  
}
