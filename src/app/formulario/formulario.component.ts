import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Cake } from '../Cakes';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
   newCake!: any
   msgError!: string
   msgPlaceCake: string
   msgPlaceUrl: string

  @Output() aFormEventEmitter = new EventEmitter();

  constructor(private _httpService: HttpService) {
     this.newCake = {name:'', url:''}
     this.msgPlaceCake =""
     this.msgPlaceUrl = ""
  }

  ngOnInit(): void {

  }

  newCake_Service() {
    this.msgError = ""
    this.msgPlaceCake =""
    this.msgPlaceUrl = ""
    this.newCake.name = this.newCake.name.trim()
    this.newCake.url = this.newCake.url.trim()
    if (this.newCake.name.length < 3 || this.newCake.name.length > 50) {
      this.msgPlaceCake = "Ingrese nombre panadero, de 3 a 50 caracteres."
      return
    }
    if (this.newCake.url.length < 10) {
      this.msgPlaceUrl = "Ingrese URL, mínimo 10 caracteres."
      return
    }
    this._httpService.newCakeService(this.newCake)
        .subscribe( {
          next: (result) => {
            // console.log('Agregado OK : ' + JSON.stringify(result) )
            this.newCake.name = ""
            this.newCake.url = ""
            this.aFormEventEmitter.emit(true)//enviando true para actualizar
            } ,
          error: (error) => {
            // console.log('Consulta Error: ' + JSON.stringify( error ) )
            this.msgError = "Error al agregar un cake."
          }
        } )
  }
}
