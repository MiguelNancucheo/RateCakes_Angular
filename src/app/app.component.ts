import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailComponent } from './detail/detail.component';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate Cakes';

  msgError: string = ""
  Cakes!: any;
  detailId: string

  @ViewChild(DetailComponent) detailChild!: DetailComponent;

  constructor(private _httpService: HttpService) {
     this.msgError = ""
     this.detailId = ""
 }

 ngOnInit () {
  // this.deleteCake('637c42f1d6c5d72ca32ea3fd')
  this.listCakes()

 }

 listCakes() {
  // this.detailId = ""
  this.msgError = ""
  this._httpService.getCakesService()
      .subscribe( {
        next: (result) => {
          // console.log('Consulta OK : ' + JSON.stringify(result) )
          this.Cakes = result
          } ,
        error: (error) => {
          // console.log('Consulta Error: ' + JSON.stringify( error ) )
          this.msgError = "Error al consultar el dato."
        }
        }
        )
}

dataFromChildForm(eventData:Boolean) {
  if (eventData) {
    //listo de nuevo
    this.listCakes()
  }
}

dataFromChildRate(eventData: string){
  // console.log(` llego eventData [${eventData}]`);
  this.detailId = eventData
  this.detailChild.getCakeId(this.detailId)
  }

deleteCake( idCake:string ) {
  // console.log(` deleteCake [${idCake}]`)
  this._httpService.deleteCakeService(idCake)
      .subscribe( {
        next: (result) => {
          // console.log('Elemento eliminado' )
          this.Cakes = result
          } ,
        error: (error) => {
          // console.log('Consulta Error: ' + JSON.stringify( error ) )
          this.msgError = "Error al eliminar."
        }
        } )
  }

}
