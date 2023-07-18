import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, ListaLivrosInterface, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<ListaLivrosInterface> {
    const params = new HttpParams().append('q', valorDigitado)
    return this.http.get<ListaLivrosInterface>(`${this.API}books/v1/volumes`, { params });
    // .pipe(
    //   tap(retornoAPI => console.log('Fluxo do tap',retornoAPI)),
    //   map(resultado => resultado.items ?? []),
    //   tap(resultado => console.log('Fluxo após o map', resultado)))
  }
}
