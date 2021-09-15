export interface IPokemonProfile {
  name: string;
  url: string;
  imageUrl?: string;
}

export interface IPokemonList {
  count: number;
  results: IPokemonProfile[];
}

export interface IPokemonUrl {
  url: string;
}