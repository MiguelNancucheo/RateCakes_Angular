import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-clasifica',
  templateUrl: './clasifica.component.html',
  styleUrls: ['./clasifica.component.css']
})
export class ClasificaComponent implements OnInit {
  // msgError: string
  msgError: string
  msgPlaceComment: string

  @Input() cake: any;
  newComment: any
  //para el envio de datos al padre, requiere de Output, EventEmitter
  @Output() aRateEventEmitter = new EventEmitter();

  constructor(private _httpService: HttpService) {
    this.msgError = ""
    this.msgPlaceComment = ""
    this.newComment = { rate:0, comment:"" }
  }

  ngOnInit(): void {
  }

  rateCake() {
    this.msgError=""
    this.msgPlaceComment =""
    this.newComment.comment = this.newComment.comment.trim()
    if (this.newComment.rate === 0 ) {
      this.msgError = "Debe seleccionar Clasificación."
      return
    }
    if (this.newComment.comment.length  < 3 || this.newComment.comment.length  > 50) {
      this.msgPlaceComment = "Ingrese comentario, entre 3 y 50 caracteres"
      return
    }
    this._httpService.addCommentCakeService(this.cake._id,
          { rate: this.newComment.rate, comment: this.newComment.comment})
        .subscribe( {
          next: (result) => {
            // console.log('Actualización OK : ' + JSON.stringify(result) )
            this.newComment.rate = 0
            this.newComment.comment = ""
            this.aRateEventEmitter.emit( this.cake._id );
            } ,
          error: (error) => {
            // console.log('Consulta Error: ' + JSON.stringify( error ) )
            this.msgError = "Error al Actualizar el rate."
          }
        } )
  }

  onClickImg() {
      //pasando un objeto con el show en true y el id
      // console.log(` que esta pasando ${this.cake._id}`)
      this.aRateEventEmitter.emit( this.cake._id );
  }
}
