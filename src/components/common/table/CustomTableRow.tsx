import React from "react";
import { TableCell, TableRow, useTheme } from "@mui/material";
import { tableRowsType, TableColsType } from "@/types/table.types";

/**
 * Interface for the props of the CustomTableRow component.
 */
interface TableRowComponentProps {
  /**
   * The data object for the current row. Each key in this object corresponds to a column in the table.
   */
  row: tableRowsType;

  /**
   * An array of column definitions for the table. This includes information on how to render the data for each column.
   */
  columns: TableColsType[];
}

/**
 * CustomTableRow component renders a single row in the table.
 * It iterates over each column definition and creates a table cell for each column based on the row data provided.
 *
 * This component is used within the body of the table to display data rows with proper formatting and alignment.
 *
 * @param {TableRowComponentProps} props The properties for the CustomTableRow component.
 * @returns {JSX.Element} A table row element with cells corresponding to each column in the table.
 */
const CustomTableRow: React.FC<TableRowComponentProps> = ({ row, columns }) => {
  const theme = useTheme();
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      dir={theme.direction}
    >
      {columns.map((column, index) => {
        const cellValue = row[column.name];

        return (
          <TableCell
            sx={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            key={`${column.name}-${index}`}
            align={
              index === 0
                ? "inherit"
                : theme.direction === "ltr"
                ? "right"
                : "left"
            }
          >
            {column.render ? column.render(cellValue, row) : cellValue}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default CustomTableRow;
