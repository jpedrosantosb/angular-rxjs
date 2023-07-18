import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';
import { LivrosResultado } from './../../models/interfaces';

const pausa = 1000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})

export class ListaLivrosComponent {

  campoBusca = new FormControl()
  mensagemErro = ''
  //livrosResultado: LivrosResultado;
  quantidadeDeLivros: string = ''

  constructor(private service: LivroService) { }

  // totalDeLivro$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(pausa),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   tap(() => console.log('Fluxo inicial.')),
  //   distinctUntilChanged(),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map(resultado => this.livrosResultado = resultado),
  //   catchError(erro => {
  //     console.log(erro)
  //     return of()
  //   })
  // )

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(pausa),
    tap(() => {console.log('Fluxo inicial de dados');}),
    filter((valorDigitado) => valorDigitado.length >= 3),
    distinctUntilChanged(),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    tap(resultado => {this.quantidadeDeLivros = resultado.totalItems ? resultado.totalItems : '0'}),
    map(resultado => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(() => {
      this.mensagemErro = "Erro ao realizar buscar, recarregar a página!";
      return EMPTY;
    })
  );

  // livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(pausa),
  //   tap(() => {console.log('Fluxo inicial de dados');}),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   distinctUntilChanged(),
  //   switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
  //   map(resultado => this.livrosResultado = resultado),
  //   map(resultado => resultado.items ?? []),
  //   map(items => this.livrosResultadoParaLivros(items)),
  //   catchError(erro =>
  //     { console.log(erro);
  //       return throwError(() =>
  //       new Error(this.mensagemErro = `Ops, ocorreu um erro! Recarregue a aplicação!`));
  //     })
  // );


  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }
}



