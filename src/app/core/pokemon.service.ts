import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IPokemonList, IPokemonUrl } from './pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private API_URL = environment.api_url;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 20, offset: number = 0): Observable<IPokemonList> {
    const url = this.API_URL + `?limit=${limit}&offset=${offset}`;
    return this.http.get<IPokemonList>(url).pipe(take(1));
  }

  getPokemonImageByName(name: string): Observable<IPokemonUrl> {
    const url = this.API_URL + `${name}/image`;
    return this.http.get<IPokemonUrl>(url).pipe(take(1));
  }
}
