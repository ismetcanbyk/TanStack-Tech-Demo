import { fetchPokemonDetail, fetchPokemons } from "@/hooks/api/api";

export const pokemonQueryOptions = {
  getPokemon: () => ({
    queryKey: ["pokemon"],
    queryFn: () => fetchPokemons().then((res) => res.results),
  }),
  getPokemonById: (id: number) => ({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonDetail(id),
  }),
};
