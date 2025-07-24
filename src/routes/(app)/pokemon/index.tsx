import { pokemonColumns } from "@/components/tables/pokemon/columns";
import { PokemonDataTable } from "@/components/tables/pokemon/data-table";
import { fetchPokemons } from "@/hooks/api/api";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/pokemon/")({
  component: RouteComponent,
  loader: async () => fetchPokemons(),
});

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });

  return (
    <PokemonDataTable
      columns={pokemonColumns}
      data={data.results}
      filterColumn="name"
      enableView={false}
      enableSelect={false}
    />
  );
}
