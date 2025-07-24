import { movesColumns } from "@/components/tables/pokemonMove/columns";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { GlobalDataTable } from "@/components/tables/shared/global-data-table";
import { pokemonQueryOptions } from "@/utils/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(app)/pokemon/$pokemonId")({
  component: PokemonDetailPage,
  beforeLoad: async ({ context }) => {
    context.testContext.setMessage("Pikachu!");
  },

  loader: (options) => {
    console.log(options.context.testContext.message, "Context");
    options.context.queryClient.ensureQueryData(
      pokemonQueryOptions.getPokemonById(Number(options.params.pokemonId))
    );
  },
  validateSearch: z.object({
    pokemonId: z.string().optional(),
  }),
});

function PokemonDetailPage() {
  const { pokemonId } = Route.useParams();

  const pokemonQuery = useSuspenseQuery(
    pokemonQueryOptions.getPokemonById(Number(pokemonId))
  );

  const data = pokemonQuery.data;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4 capitalize text-center">
          {data?.forms?.[0]?.name}
        </h1>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">ID:</span> {data?.id}
          </div>
          <div>
            <span className="font-semibold">Base Experience:</span>{" "}
            {data?.base_experience}
          </div>
          <div>
            <span className="font-semibold">Height:</span> {data?.height}
          </div>
          <div>
            <span className="font-semibold">Is Default:</span>{" "}
            {data?.is_default ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Abilities:</span>
            <ul className="list-disc list-inside ml-4">
              {data?.abilities?.map((a: any, i: number) => (
                <li key={i}>{a.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Forms:</span>
            <ul className="list-disc list-inside ml-4">
              {data?.forms?.map((f: any, i: number) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold">Location Area Encounters:</span>{" "}
            <a
              href={data?.location_area_encounters}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {data?.location_area_encounters}
            </a>
          </div>
        </div>
      </div>
      <GlobalDataTable
        columns={movesColumns}
        data={data?.moves.map((move) => ({ moves: [move] })) ?? []}
        enableView={false}
        enableSelect={false}
      />
    </div>
  );
}
