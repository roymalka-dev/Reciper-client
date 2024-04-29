import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { TableColsType } from "@/types/table.types";

type CustomTableHeadProps = {
  /**
   * An array of column definitions for the table. Each column definition contains information such as the column name and locale.
   */
  cols: TableColsType[];

  /**
   * Function to handle sort requests. This function is called when a sortable column's header is clicked.
   * @param {React.MouseEvent<unknown>} event The mouse event that triggered the sort request.
   * @param {string} property The name of the column to sort by.
   */
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;

  /**
   * The current sort order ('asc' for ascending or 'desc' for descending).
   */
  order: "asc" | "desc";

  /**
   * The name of the currently sorted column.
   */
  orderBy: string;
};

/**
 * CustomTableHead component renders the header row of a table with sortable columns.
 * It displays each column's title and includes a sort indicator for sortable columns.
 * Clicking on a column's header triggers sorting based on that column.
 *
 * @param {CustomTableHeadProps} props The properties for the CustomTableHead component.
 * @returns {JSX.Element} The table head with sortable column headers.
 */
const CustomTableHead: React.FC<CustomTableHeadProps> = ({
  cols,
  onRequestSort,
  order,
  orderBy,
}) => {
  /**
   * Creates a handler function for sort requests for a specific column.
   * @param {string} property The name of the column to sort by.
   * @returns {function} A function that takes a mouse event and triggers the sort request.
   */
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {cols.map((col, index) => (
          <TableCell
            key={col.name}
            align={index > 0 ? "right" : "left"}
            sortDirection={orderBy === col.name ? order : false}
          >
            {!col.name.includes("options") && (
              <TableSortLabel
                active={orderBy === col.name}
                direction={orderBy === col.name ? order : "asc"}
                onClick={createSortHandler(col.name)}
              >
                {col.name}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
