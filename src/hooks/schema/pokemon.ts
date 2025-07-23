import { z } from "zod";

export const pokemonSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonSchema),
});

export type PokemonList = z.infer<typeof pokemonListSchema>;

export const pokemonDetailSchema = z.object({
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
  base_experience: z.number(),
  forms: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),

  height: z.number(),
  held_items: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
  id: z.number(),
  is_default: z.boolean(),
  location_area_encounters: z.string(),
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
        url: z.string(),
      }),
      version_group_details: z.array(
        z.object({
          level_learned_at: z.number(),
          move_learn_method: z.object({
            name: z.string(),
            url: z.string(),
          }),
          order: z.number().nullable(),
          version_group: z.object({
            name: z.string(),
            url: z.string(),
          }),
        })
      ),
    })
  ),
});

export type PokemonDetail = z.infer<typeof pokemonDetailSchema>;

export const pokemonMovesSchema = z.object({
  moves: z.array(
    z.object({
      move: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});

export type PokemonMoves = z.infer<typeof pokemonMovesSchema>;
