import axios from "axios";
import {
  pokemonDetailSchema,
  pokemonListSchema,
  type PokemonDetail,
  type PokemonList,
} from "../schema/pokemon";

export async function fetchPokemons(): Promise<PokemonList> {
  const response = await axios.get<PokemonList>(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const data = pokemonListSchema.safeParse(response.data);
  if (!data.success) {
    throw new Error("Invalid response from API");
  }
  return data.data;
}

export async function fetchPokemonDetail(
  pokemonId: string
): Promise<PokemonDetail> {
  const response = await axios.get<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = pokemonDetailSchema.safeParse(response.data);
  if (!data.success) {
    throw new Error("Invalid response from API");
  }

  return data.data;
}
