import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IPokemonList, IPokemonProfile, IPokemonUrl } from '../../core/pokemon.interface';
import { PokemonService } from '../../core/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'imageUrl'];
  resultsData: IPokemonProfile[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngAfterViewInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  getData() {
    this.isLoadingResults = true;
    this.pokemonService.getPokemonList(this.paginator.pageSize, this.paginator.pageSize * this.paginator.pageIndex)
    .subscribe((result: IPokemonList) => {
      this.resultsLength = result.count;
      this.resultsData = result.results;
      this.isLoadingResults = false;

      for (const poke of this.resultsData) {
        this.pokemonService.getPokemonImageByName(poke.name)
          .subscribe((result: IPokemonUrl) => {
            poke.imageUrl = result.url;
          })
      }
    });
  }

  handlePageUpdate() {
    this.getData();
  }
}