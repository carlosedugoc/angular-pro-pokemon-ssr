import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export default class PokemonsPageComponent {
  public isLoading = signal(true);
/*   private appRef = inject(ApplicationRef)
  private $appState = this.appRef.isStable.subscribe(isStable => {
    if(isStable) {
      setTimeout(() => {
        this.isLoading.set(false);
        this.$appState.unsubscribe()
      }, 2000);
    }
  }) */

    private pokemonsService = inject(PokemonsService)
    public pokemons = signal<SimplePokemon[]>([])
    private route = inject(ActivatedRoute)
    private router = inject(Router)
    private title = inject(Title)
    public currentPage = toSignal<number>(
      this.route.params.pipe(
        map(params => params['page'] ?? '1'),
        map(page => (isNaN(+page) ? 1 : +page)),
        map(page => Math.max(1, page))
      )
    )

public loadPokemons(page = 0) {
  this.pokemonsService.loadPage(page)
  .pipe(
    tap(() => this.title.setTitle(`Pokemon SSR - Page ${page}`))
  )
  .subscribe(this.pokemons.set)
}

public loadOnPageChaged = effect(() =>{
  this.loadPokemons(this.currentPage())
}, {allowSignalWrites:true})
}
