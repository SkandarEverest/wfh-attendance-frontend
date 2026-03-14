import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import EmptyData from "./EmptyData";
import Pagination from "./Pagination";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  emptyMessage?: string;
  pagination?: {
    page: number;
    size: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}

export default function Table<T>({
  data,
  columns,
  emptyMessage = "No data yet.",
  pagination,
}: Readonly<TableProps<T>>) {
  const manualPagination = Boolean(pagination);

  const table = useReactTable({
    data,
    columns,
    manualPagination,
    rowCount: pagination?.total,
    state: pagination
      ? {
          pagination: {
            pageIndex: Math.max(pagination.page - 1, 0),
            pageSize: pagination.size,
          },
        }
      : undefined,
    onPaginationChange: pagination
      ? (updater) => {
          const current = {
            pageIndex: Math.max(pagination.page - 1, 0),
            pageSize: pagination.size,
          };
          const next =
            typeof updater === "function" ? updater(current) : updater;

          if (next.pageSize !== current.pageSize) {
            pagination.onPageSizeChange(next.pageSize);
            return;
          }

          if (next.pageIndex !== current.pageIndex) {
            pagination.onPageChange(next.pageIndex + 1);
          }
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b-2 border-gray-200 bg-gray-lighter px-4 py-2.5 text-left text-xs font-semibold text-gray"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-lighter">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && <EmptyData message={emptyMessage} />}
      </div>

      {(pagination ? pagination.total > 0 : data.length > 0) && (
        <Pagination table={table} />
      )}
    </div>
  );
}
