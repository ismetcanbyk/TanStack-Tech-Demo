import axios from "axios";
import { pokemonDetailSchema, pokemonListSchema } from "../schema/pokemon";

export async function fetchPokemons() {
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const data = pokemonListSchema.safeParse(response.data);
  if (!data.success) {
    throw new Error("Invalid response from API");
  }
  return data.data.results;
}

export async function fetchPokemonDetail(pokemonId: number) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = pokemonDetailSchema.safeParse(response.data);
  if (!data.success) {
    console.log(data.error);
    throw new Error("Invalid response from API");
  }

  return data.data;
}
