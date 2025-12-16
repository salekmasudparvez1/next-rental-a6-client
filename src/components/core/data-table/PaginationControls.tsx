"use client"

import { Table as TanStackTable } from "@tanstack/react-table"
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface PaginationControlsProps<TData> {
  table: TanStackTable<TData>
}

export function PaginationControls<TData>({
  table,
}: PaginationControlsProps<TData>) {
  return (
    <div className="flex flex-col gap-3 px-2 py-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Left info */}
      <div className="text-muted-foreground text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      {/* Desktop Controls */}
      <div className="hidden items-center space-x-6 lg:flex">
        <RowsPerPage table={table} />

        <PageInfo table={table} />

        <PaginationButtons table={table} />
      </div>

      {/* Mobile Collapsible */}
      <Collapsible className="lg:hidden">
        <div className="flex items-center justify-between">
          <PageInfo table={table} />

          <CollapsibleTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="mt-3 space-y-3">
          <RowsPerPage table={table} />
          <PaginationButtons table={table} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

/* ------------------ Sub Components ------------------ */

function RowsPerPage<TData>({ table }: { table: TanStackTable<TData> }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">Rows</p>
      <Select
      
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="h-8 w-[72px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          {[10, 20, 25, 30, 40, 50].map((size) => (
            <SelectItem key={size} value={`${size}`}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function PageInfo<TData>({ table }: { table: TanStackTable<TData> }) {
  return (
    <div className="text-sm font-medium ">
      Page {table.getState().pagination.pageIndex + 1} of{" "}
      {table.getPageCount()}
    </div>
  )
}

function PaginationButtons<TData>({
  table,
}: {
  table: TanStackTable<TData>
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="hidden lg:flex"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="hidden lg:flex"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  )
}
