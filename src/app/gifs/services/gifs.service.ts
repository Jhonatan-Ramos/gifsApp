import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _apiKey   : string = '2PmbzWsUbXDBeCvQLxNCCUgWgphgspOA';
  private _historial: string[] = [];

  public resultados: Gifs[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor ( private http: HttpClient) {

    // if( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse( localStorage.getItem(' historial')!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs( query: string = '' ) {

    query = query.trim().toLocaleLowerCase()

    if( !this._historial.includes(query) ) {

      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ))
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=2PmbzWsUbXDBeCvQLxNCCUgWgphgspOA&q=${ query }&limit=10`)
      .subscribe ( ( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      })

    console.log(this._historial);
  }
}
