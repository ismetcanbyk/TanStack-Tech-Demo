import { Loader } from "@/components/loader";
import { DataTable } from "@/components/ui/data-table";
import { fetchPokemonDetail } from "@/hooks/api/api";
import type { PokemonMoves } from "@/hooks/schema/pokemon";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

export const Route = createFileRoute("/(app)/pokemon/$pokemonId")({
  component: PokemonDetailPage,
  loader: async ({ params }) => {
    return fetchPokemonDetail(params.pokemonId);
  },
  pendingComponent: () => <Loader />,
});

export const columns: ColumnDef<PokemonMoves>[] = [
  {
    header: "Moves",
    accessorKey: "moves",
    cell: ({ row }) => {
      return (
        <div>{row.original.moves.map((move) => move.move.name).join(", ")}</div>
      );
    },
  },
];

function PokemonDetailPage() {
  const data = useLoaderData({ from: Route.id });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 capitalize text-center">
          {data.forms[0].name}
        </h1>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">ID:</span> {data.id}
          </div>
          <div>
            <span className="font-semibold">Base Experience:</span>{" "}
            {data.base_experience}
          </div>
          <div>
            <span className="font-semibold">Height:</span> {data.height}
          </div>
          <div>
            <span className="font-semibold">Is Default:</span>{" "}
            {data.is_default ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Abilities:</span>
            <ul className="list-disc list-inside ml-4">
              {data.abilities.map((a: any, i: number) => (
                <li key={i}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Forms:</span>
            <ul className="list-disc list-inside ml-4">
              {data.forms.map((f: any, i: number) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Location Area Encounters:</span>{" "}
            <a
              href={data.location_area_encounters}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {data.location_area_encounters}
            </a>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data.moves.map((move) => ({ moves: [move] }))}
        enableFilter={false}
        enableView={false}
        enableSelect={false}
      />
    </div>
  );
}
