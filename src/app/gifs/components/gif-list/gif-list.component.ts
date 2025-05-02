import { Component, input, Input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";

@Component({
  selector: 'gif-list',
  standalone: true,
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListComponent {
  // Se debe recibir los Gifs
  //TODO: imageUrl: string; input
  // @Input() gifs: string[] = [];
  // se recibe la señal como un objeto de strings
  gifs = input.required<string[]>();
 }
