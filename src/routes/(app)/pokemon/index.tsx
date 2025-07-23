import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { fetchPokemons } from "@/hooks/api/api";
import type { Pokemon } from "@/hooks/schema/pokemon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";

export const Route = createFileRoute("/(app)/pokemon/")({
  component: RouteComponent,
  loader: async () => fetchPokemons(),
  pendingComponent: () => <Loader />,
});

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Detail"
          enableSorting={false}
        />
      );
    },
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">...</Button>
          </PopoverTrigger>
          <PopoverContent
            className="bg-gray-500 p-4 rounded-2xl  "
            side="right"
          >
            <div className="text-lg text-center font-bold">
              {row.original.name.toUpperCase()}
            </div>

            <Button
              variant="outline"
              className="items-center  mt-4"
              onClick={() => {
                navigate({
                  to: `/pokemon/${row.original.url.split("/").filter(Boolean).pop()}`,
                });
              }}
            >
              Detayları Görüntüle
            </Button>
          </PopoverContent>
        </Popover>
      );
    },
  },
];

function RouteComponent() {
  const data = useLoaderData({ from: Route.id });

  return (
    <DataTable
      columns={columns}
      data={data.results}
      filterColumn="name"
      enableFilter={true}
      enableView={false}
      enableSelect={false}
    />
  );
}
