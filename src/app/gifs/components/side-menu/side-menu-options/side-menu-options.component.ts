import {  Component, Input, Signal } from '@angular/core';
import { MenuOption } from '../../../interfaces/menuOptions.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'gifs-side-menu-options',
  standalone: true,
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html',
})
export class SideMenuOptionsComponent {
  @Input() menuOptions!: Signal<MenuOption[]>; // Recibe la señal como entrada
}
