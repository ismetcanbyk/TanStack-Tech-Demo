import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { z } from "zod";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const Route = createFileRoute("/posts")({
  component: RouteComponent,
});

const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export const columns: ColumnDef<z.infer<typeof postSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Body" />;
    },
    cell: ({ row }) => (
      <div className="w-[500px] truncate text-ellipsis text-wrap">
        {row.original.body}
      </div>
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="User Id" />;
    },
  },
];

function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // 1 dakika boyunca "fresh"
    gcTime: 1000 * 60 * 5, // 5 dakika boyunca cache'de tut
  });

  if (isLoading) return <p>Yükleniyor...</p>;
  if (isError) return <p>Hata: {error.message}</p>;

  return <DataTable columns={columns} data={data ?? []} />;
}

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const checkData = postSchema.array().safeParse(res.data);
  if (!checkData.success) {
    console.log(checkData.error);
    throw new Error(checkData.error.message);
  }
  return checkData.data;
};
