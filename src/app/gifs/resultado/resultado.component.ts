import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultado.component.html',
  styles: [
  ]
})
export class ResultadoComponent {

  get resultado() {
    return this.gifService.resultados;
  }

  constructor( private gifService: GifsService ) { }



}
