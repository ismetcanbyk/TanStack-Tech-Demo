import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import type { Column } from "@tanstack/react-table";

export function HeaderSortingButton<TData>({
  column,
  title,
}: {
  column: Column<TData>;
  title: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}

      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
