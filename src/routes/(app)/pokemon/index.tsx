import { pokemonColumns } from "@/components/tables/pokemon/columns";
import { PokemonDataTable } from "@/components/tables/pokemon/data-table";
import { pokemonQueryOptions } from "@/utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/pokemon/")({
  component: RouteComponent,
  loader: (options) => {
    options.context.queryClient.ensureQueryData(
      pokemonQueryOptions.getPokemon()
    );
  },
});

function RouteComponent() {
  const pokemonQuery = useSuspenseQuery(pokemonQueryOptions.getPokemon());

  return (
    <PokemonDataTable
      columns={pokemonColumns}
      data={pokemonQuery.data ?? []}
      filterColumn="name"
      enableView={false}
      enableSelect={false}
    />
  );
}
