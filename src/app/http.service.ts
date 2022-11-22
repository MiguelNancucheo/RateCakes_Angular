import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Cake } from './Cakes';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  urlLocal:string = environment.urlLocal

  constructor(private _http: HttpClient)  { }


  newCakeService( newCake: Cake){
    return this._http.post( this.urlLocal + '/newcake', newCake)
  }

  getCakesService(){
    return this._http.get( this.urlLocal + '/cakes' )
  }

  deleteCakeService( idCake: string ){
    // console.log(` deleteCakeService [${idCake}]`)
    return this._http.delete( this.urlLocal + '/cake/' + idCake)
  }

  addCommentCakeService( idCake: string, newComment: {} ) {
    return this._http.put( this.urlLocal + '/cakecomment/' + idCake, newComment )
  }

  getCakeIdService(idCake: string){
    return this._http.get( this.urlLocal + '/cake/' + idCake )
  }
}
