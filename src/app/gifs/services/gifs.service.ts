import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment.development';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';

// {
//   'Goku': [gif1, gif2, gif3],
//   'Saitama': [gif1, gif2, gif3],
//   ''
// }

const loadFromLoadStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem('gifs') ?? '{}';
  return gifs ? JSON.parse(gifs) : {};
}

//* Tipado para un objetos que sus llaves son dinamicas
//* Record<string, Gif[]>

@Injectable({providedIn: 'root'})
export class GifService {

//* Se crea un objeto de tipo HttpCliet
private http = inject(HttpClient);

//* Se crea una señaltrendingGifsLoading() = true
trendingGifsLoading = signal(true);

//* Se crea una señal de un array de objetos tipo Gif
trendingGifs = signal<Gif[]>([]);

//*
trendigGifGroup = computed( () => {
  const groups = [];
  for ( let i = 0; i < this.trendingGifs().length; i +=3) {
    groups.push( this.trendingGifs().slice(i, i+3))
  }
  console.log(groups);
  return groups;
});

//* Esta señal permite guardar los elementos de busquedad en el storage */
searchHistory = signal<Record<string, Gif[]>>(loadFromLoadStorage());

//* obtiene las key de la señal searchHistory() la cual contiene los resultados de la busquedad */
searchHistoryKeys = computed( () => Object.keys(this.searchHistory()));

constructor() {
  this.loadTrendingGifs();
  //console.log('Servicio creado');
}

  loadTrendingGifs(): void {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApikey,
        limit: 25,
      }
    }).subscribe( (resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      //console.log({gifs});
    })
  }

  //* Esta función permite la busquedad de gifs en el endpoint https://api.giphy.com/v1/gifs/search */
  searchGifs( query: string ): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApikey,
        q: query,
        limit: 25,
      }
    })
    //* Obtiene la respuesta del endpoint de giphy realiza el mapper */
    .pipe(
      map( ({data}) => data),
      map( (items) => GifMapper.mapGiphyItemsToGifArray(items) ),
      //** Esta función permite actualizar a la señal searchHistory() con los items que devolvio la busquedad*/
      tap( items => {
        this.searchHistory.update( (history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
  );

    // .subscribe( (resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log({search: gifs});
    // });
  }

  getHistoryGifs( query: string ): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  //**Los effectos (effect) permiten disparar funciones cada que vez que se presente una acción */
  saveToLocalStorage = effect( () => {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory()))
  });

}
