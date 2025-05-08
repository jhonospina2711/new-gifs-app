import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  gifService = inject(GifService)

  //** cuando se cambia de opción en el menu entre los diferentes componentes de busquedad*/
  //* Esta función permite suscribirse a los cambios ya que no requiere modificar*/
  // query = inject(ActivatedRoute).params.subscribe(
  //   (params) => {
  //     console.log(params['query']);
  //   });

  //** Esta función es un signal que contiene los params*/
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  gifByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  }

  )
}
