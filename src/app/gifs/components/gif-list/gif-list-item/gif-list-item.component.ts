import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  standalone: true,
  imports: [],
  templateUrl: './gif-list-item.component.html',
})
export class GifListItemComponent {

  // Se recibe la señal y se guarda en imageUrl
  imageUrl = input.required<string>();


}
