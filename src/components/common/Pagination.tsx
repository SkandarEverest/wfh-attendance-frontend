import type { Table } from "@tanstack/react-table";

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function Pagination<T>({
  table,
}: Readonly<{ table: Table<T> }>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getRowCount();
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm text-gray">
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          className="rounded border border-gray-light bg-white px-2 py-1 text-sm outline-none transition-colors focus:border-blue-600"
          value={pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span>
          {totalRows === 0 ? "0" : `${start}–${end}`} of {totalRows}
        </span>
        <div className="flex gap-1">
          <button
            className="rounded bg-gray-200 px-2.5 py-1 text-sm font-medium text-gray-dark hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            ‹
          </button>
          <button
            className="rounded bg-gray-200 px-2.5 py-1 text-sm font-medium text-gray-dark hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
