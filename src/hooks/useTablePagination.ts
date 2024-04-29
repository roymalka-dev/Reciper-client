import { useState } from "react";

/**
 * Custom React hook for managing pagination state in a table component.
 *
 * @param {number} [initialRowsPerPage=5] - The initial number of rows per page, defaults to 5.
 * @returns {object} An object containing pagination state and functions to handle page and rows per page changes.
 */
const useTablePagination = (initialRowsPerPage: number = 5) => {
  /**
   * State variables to keep track of the current page and number of rows per page.
   */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  /**
   * Function to handle page change in the table.
   *
   * @param {unknown} _event - The event object (not used in this function).
   * @param {number} newPage - The new page number.
   * @returns {void}
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Function to handle change in the number of rows per page.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input element.
   * @returns {void}
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
};

export default useTablePagination;
