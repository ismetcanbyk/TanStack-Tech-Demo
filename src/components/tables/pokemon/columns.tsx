import { DataTableColumnHeader } from "@/components/tables/shared/data-table-column-header";
import type { Pokemon } from "@/hooks/schema/pokemon";
import type { ColumnDef } from "@tanstack/react-table";
import { PokemonUrlCell } from "./custom-cells/pk-url-cell";

export const pokemonColumns: ColumnDef<Pokemon>[] = [
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
      return <PokemonUrlCell row={row} />;
    },
  },
];
