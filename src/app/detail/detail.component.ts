import { HttpService } from '../http.service';
import { Cake } from '../Cakes';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  msgError: string = "";
  @Input() idCake!: string;
  cake!: any;
  promedio:string = "";

  constructor(private _httpService: HttpService) {}

  ngOnInit(): void {
    if (this.idCake.length > 0 ) {
      this.getCakeId( this.idCake )
    }
  }

  getCakeId( idCake:string) {
    this.promedio = ""
    this.msgError = ""
    if (idCake.length > 0) {
      this._httpService.getCakeIdService(idCake).subscribe( {
        next: (result) => {
            // console.log('Get de cake OK : ' + JSON.stringify(result) )
            this.cake = result
            //promedio
            if (this.cake.comments) {
              let suma=0
              for (let index = 0; index < this.cake.comments.length; index++) {
                suma = suma + this.cake.comments[index].rate
              }
              this.promedio = (suma / this.cake.comments.length).toFixed(2)
            } else {
              this.promedio = "0"
            }
          } ,
        error: (error) => {
          console.log('Consulta Error: ' + JSON.stringify( error ) )
          this.msgError = "Error al consultar cake."
        }
      } )
    }
  }


}
