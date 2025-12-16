"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  manualPagination?: boolean
  pageCount?: number
  onPaginationChange?: OnChangeFn<PaginationState>
  onSelectionChange?: (selectedRows: TData[]) => void;

}

export function DataTable<TData, TValue>({
  columns,
  data,
  manualPagination = false,
  pageCount,
  onPaginationChange,
  onSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({})
  
  const table = useReactTable({
    data,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel:getSortedRowModel(),

    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    onRowSelectionChange: (updater) => {
      
      setRowSelection(updater)
      const nextState =
        typeof updater === "function" ? updater(rowSelection) : updater
      const selected = table
        .getSelectedRowModel()
        .rows.map((r) => r.original as TData)
      onSelectionChange?.(selected)
      return nextState
    },
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
    <div className="overflow-hidden w-full  rounded-md border border-neutral-200 bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 [box-shadow:3px_3px_3px_rgb(82_82_82)]">
      <Table className=" bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="border border-gray-300  bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="py-2  bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100  [box-shadow:1px_2px_1px_rgb(82_82_82)]">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border border-gray-300 rounded-none  bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className=" bg-transparent p-3 font-medium text-neutral-600 transition-all duration-100 hover:[box-shadow:2px_3px_3px_rgb(82_82_82)] [box-shadow:1px_2px_1px_rgb(82_82_82)]">
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
      <PaginationControls table={table} />
    </div>
  )
}

