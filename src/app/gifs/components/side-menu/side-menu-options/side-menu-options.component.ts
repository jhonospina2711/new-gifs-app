import { Component, effect, inject, Input, signal, Signal } from '@angular/core';
import { MenuOption } from '../../../interfaces/menuOptions.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gifs-side-menu-options',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
gifService = inject(GifService);

    menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    }
  ]



  // searchGif = signal<MenuOption[]>;
  // searchHistoryKeys = signal<Gif[]>([]);
  // constructor() {

  //   // Observa los cambios en searchHistoryKeys y muestra en consola
  //   effect(() => {
  //     this.gifService.searchHistoryKeys()
  //     const updatedGifs = Object.values(this.gifService.searchHistory()).flat();
  //     this.searchHistoryKeys.set(updatedGifs);
  //     console.log('Search History Keys (Gifs):', updatedGifs);
  //   },
  //     { allowSignalWrites: true }

  //   );
  }
