import { Loader } from "@/components/Loader";
import { usePokemonColumns } from "@/components/tables/pokemon/columns";
import { PokemonDataTable } from "@/components/tables/pokemon/data-table";
import { fetchPokemons } from "@/hooks/api/api";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/pokemon/")({
  component: RouteComponent,
  loader: async () => fetchPokemons(),
  pendingComponent: () => <Loader />,
});

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });

  return (
    <PokemonDataTable
      columns={usePokemonColumns}
      data={data.results}
      filterColumn="name"
      enableView={false}
      enableSelect={false}
    />
  );
}
