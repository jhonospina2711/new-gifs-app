import { Component, signal } from '@angular/core';
import { SideMenuHeaderComponent } from '../side-menu/side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent } from '../side-menu/side-menu-options/side-menu-options.component';
import { MenuOption } from '../../interfaces/menuOptions.interface'; // Importa la interfaz


@Component({
  selector: 'gifs-side-menu',
  standalone: true,
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  // menuOptions: MenuOption[] = [
  //   {
  //     icon: 'fa-solid fa-chart-line',
  //     label: 'Trending',
  //     subLabel: 'Gifs Populares',
  //     route: '/dashboard/trending'
  //   },
  //   {
  //     icon: 'fa-solid fa-magnifying-glass',
  //     label: 'Buscador',
  //     subLabel: 'Buscar gifs',
  //     route: '/dashboard/search'
  //   }
  // ]
  menuOptions = signal<MenuOption[]>([
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
  ])
}
