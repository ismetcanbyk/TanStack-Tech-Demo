import axios from "axios";
import { pokemonDetailSchema, pokemonListSchema } from "@/lib/schema/pokemon";
import { commentSchema, postSchema } from "@/lib/schema/post";

export async function fetchPokemons() {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=1000"
  );

  const parsedData = pokemonListSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid response from API");
  }
  return parsedData.data.results;
}

export async function fetchPokemonDetail(pokemonId: string) {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const parsedData = pokemonDetailSchema.safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid response from API");
  }

  return parsedData.data;
}

export async function fetchPosts() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const parsedData = postSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error("Invalid response from API");
  }
  return parsedData.data;
}

export async function fetchPostComments(postId: string) {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const parsedData = commentSchema.array().safeParse(data);
  if (!parsedData.success) {
    console.log(parsedData.error);
    throw new Error("Invalid response from API");
  }
  return parsedData.data;
}
