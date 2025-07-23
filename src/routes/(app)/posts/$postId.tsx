import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/(app)/posts/$postId")({
  component: RouteComponent,
});

const commentSchema = z.object({
  id: z.number(),
  postId: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

export const columns: ColumnDef<z.infer<typeof commentSchema>>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Comment" />;
    },
    cell: ({ row }) => (
      <div className="w-[500px] truncate text-ellipsis text-wrap">
        {row.original.body}
      </div>
    ),
  },
  {
    accessorKey: "postId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Post ID" />;
    },
  },
];

function RouteComponent() {
  const { postId } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComment(postId),
    staleTime: 1000 * 60, // 1 dakika boyunca "fresh"
    gcTime: 1000 * 60 * 5, // 5 dakika boyunca cache'de tut
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Hata: {error?.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post Comments {postId}</h1>
      <DataTable
        columns={columns}
        data={data ?? []}
        enableFilter={false}
        enableView={false}
      />
    </div>
  );
}

const fetchComment = async (blogId: string) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${blogId}/comments`
  );
  const checkData = commentSchema.array().safeParse(res.data);
  if (!checkData.success) {
    console.log(checkData.error);
    throw new Error(checkData.error.message);
  }
  return checkData.data;
};
