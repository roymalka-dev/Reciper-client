/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  Box,
  CircularProgress,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";
import { debounce } from "lodash";
import CustomTableHead from "./CustomTableHead";
import CustomTableRow from "./CustomTableRow";
import CustomTableToolbar from "./CustomTableToolbar";
import useTableSorter from "@/hooks/useTableSorter";

import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import { CheckboxMenuButton } from "../../ui/buttons/CheckboxMenuButton";
import { TableDataType } from "@/types/table.types";
import useTablePagination from "@/hooks/useTablePagination";

/**
 * Interface for the CustomTable component's props
 */
interface CustomTableProps {
  data: TableDataType; // Data to be displayed including rows and column definitions.
  toolbar?: (() => JSX.Element)[]; // Optional array of toolbar elements rendered above the table.
  loading?: boolean; // Indicates if the data is being loaded.
  searchHandler?: (searchText: string) => void; // Optional function for handling search input.
  paginationHandler?: typeof useTablePagination; // Optional custom pagination handler function.
}

/**
 * CustomTable component encapsulates functionality for rendering a data table with support for
 * sorting, pagination, and filtering columns. It aims to be reusable and flexible for various
 * data types and use cases.
 *
 * @param {CustomTableProps} props - Properties passed to the component.
 * @returns {JSX.Element} - The fully rendered table component.
 */
const CustomTable: React.FC<CustomTableProps> = ({
  data,
  toolbar = [],
  loading,
  searchHandler,
  paginationHandler,
}) => {
  const DEBOUNCE_SEARCH_INPUT_TIME_IN_MS = 300;
  const PAGINATION_NUMBERS = [10, 25, 50, 100];

  const theme = useTheme();
  const pagination = paginationHandler
    ? paginationHandler(25)
    : useTablePagination(25);
  const { order, orderBy, handleRequestSort } = useTableSorter();

  const [activeColumns, setActiveColumns] = useState(
    new Set(data.cols.map((col) => col.name))
  );

  /**
   * Toggles the visibility of a column in the table.
   * @param {string} colName - The name of the column to toggle.
   * @returns {void}
   */
  const toggleColumn = useCallback((colName: string) => {
    setActiveColumns((prevActiveColumns) => {
      const newActiveColumns = new Set(prevActiveColumns);
      if (newActiveColumns.has(colName)) {
        newActiveColumns.delete(colName);
      } else {
        newActiveColumns.add(colName);
      }
      return newActiveColumns;
    });
  }, []);

  /**
   * Filters the columns based on the active columns set.
   * @returns {Column[]} - The filtered columns.
   */
  const filteredCols = useMemo(
    () => data.cols.filter((col) => activeColumns.has(col.name)),
    [data.cols, activeColumns]
  );

  /**
   * Returns a button for filtering columns.
   * @returns {JSX.Element} - The filter columns button.
   */
  const filterColsButton = () => {
    return (
      <CheckboxMenuButton
        name={
          <FilterAltRoundedIcon
            color={
              filteredCols.length < data.cols.length ? "primary" : "secondary"
            }
          />
        }
        options={data.cols.map((col) => col.name)}
        active={filteredCols.map((col) => col.name)}
        handler={(_selected: any, option: string) => toggleColumn(option)}
      />
    );
  };

  // Add the filter columns button to the toolbar.
  toolbar = [filterColsButton, ...toolbar];

  // Search text state and debounced search handler.
  const [searchText, setSearchText] = useState("");

  /**
   * Debounces the search input and calls the search handler.
   * @returns {void}
   */
  useEffect(() => {
    const debouncedSearch = debounce(
      () => searchHandler?.(searchText),
      DEBOUNCE_SEARCH_INPUT_TIME_IN_MS
    );
    debouncedSearch();
    return () => debouncedSearch.cancel();
  }, [searchText, searchHandler]);

  /**
   * Handles sorting of the table rows.
   * @param {string} property - The property to sort by.
   * @returns {void}
   */
  const sortedAndFilteredRows = useMemo(() => {
    let rows = data.rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (
      orderBy &&
      filteredCols.find((col) => col.name === orderBy)?.comparator
    ) {
      const comparator = filteredCols.find((col) => col.name === orderBy)!
        .comparator!;
      rows = rows.sort(
        (a, b) =>
          (order === "asc" ? 1 : -1) * comparator(a[orderBy], b[orderBy])
      );
    }

    return rows;
  }, [data.rows, filteredCols, orderBy, order, searchText]);

  return (
    <TableContainer
      component={Paper}
      dir={theme.direction}
      sx={{ mx: "auto", maxWidth: "100%", overflowX: "auto" }}
    >
      <CustomTableToolbar
        toolbar={toolbar}
        onSearchChange={(e) => setSearchText(e.target.value)}
      />
      <Table aria-label="custom table">
        <CustomTableHead
          cols={filteredCols}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={filteredCols.length}
                style={{ textAlign: "center" }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            sortedAndFilteredRows
              .slice(
                pagination.page * pagination.rowsPerPage,
                pagination.page * pagination.rowsPerPage +
                  pagination.rowsPerPage
              )
              .map((row, index) => (
                <CustomTableRow key={index} row={row} columns={filteredCols} />
              ))
          )}
        </TableBody>
      </Table>
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <TablePagination
          rowsPerPageOptions={PAGINATION_NUMBERS}
          component="div"
          count={sortedAndFilteredRows.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={pagination.handleChangePage}
          onRowsPerPageChange={pagination.handleChangeRowsPerPage}
          labelRowsPerPage={"Rows per page:"}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} of ${count}`
          }
        />
      </Box>
    </TableContainer>
  );
};

export default CustomTable;
