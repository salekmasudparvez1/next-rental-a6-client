
"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { PaginationControls } from "./PaginationControls"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  manualPagination?: boolean
  pageCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
  onSelectionChange?: (selectedRows: TData[]) => void

}

export function DataTable<TData, TValue>({
  columns,
  data,
  manualPagination = false,
  pageCount,
  onPaginationChange,
  onSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination,
    pageCount,
    onPaginationChange,
  })
  useEffect(() => {
    const selected = table
      .getSelectedRowModel()
      .rows.map((r) => r.original as TData)
    onSelectionChange?.(selected)
  }, [table, rowSelection, onSelectionChange])


  return (
    <div className="overflow-hidden w-full rounded-md border border-neutral-200 bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 [box-shadow:3px_3px_3px_rgb(82_82_82)]">
      {/* Desktop table */}
      <div className="hidden lg:block">
        <Table className="bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border border-gray-300 bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="py-2 bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 ">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border border-gray-300 rounded-none bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)] "
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center ">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile collapsible cards */}
      <div className="lg:hidden space-y-3">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            const primaryCell = row.getVisibleCells()[0]
            return (
              <div
                key={row.id}
                className="border border-gray-300 rounded-md bg-white p-3 shadow-sm transition-all duration-150"
              >
                <button
                  className="flex w-full items-center justify-between text-left"
                  onClick={() =>
                    setExpandedRowId((prev) => (prev === row.id ? null : row.id))
                  }
                >
                  <div className="font-semibold">
                    {flexRender(
                      primaryCell.column.columnDef.cell,
                      primaryCell.getContext()
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {expandedRowId === row.id ? "Hide" : "View"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {expandedRowId === row.id && (
                    <motion.div
                      key={row.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 }
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="overflow-hidden" 
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="mt-3 space-y-2"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <div
                            key={cell.id}
                            className="flex items-start justify-between gap-3 rounded-md bg-gray-50 px-3 py-2"
                          >
                            <span className="text-xs font-medium text-muted-foreground">
                              {typeof cell.column.columnDef.header === "string"
                                ? cell.column.columnDef.header
                                : (cell.column.columnDef.meta as { label?: string } | undefined)?.label ??
                                cell.column.id}
                            </span>
                            <span className="text-sm">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })
        ) : (
          <div className="text-center text-sm text-muted-foreground">No results.</div>
        )}
      </div>

      <PaginationControls table={table} />
    </div>
  )
}

