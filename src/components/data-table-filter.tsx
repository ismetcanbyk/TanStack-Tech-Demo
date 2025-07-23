"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";

export function DataTableFilter<TData>({ table }: { table: Table<TData> }) {
  return (
    <div>
      <Input
        placeholder="Filter posts title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>
  );
}
