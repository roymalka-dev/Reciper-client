import { useState } from "react";

type Order = "asc" | "desc";

interface UseTableSortReturnType {
  order: Order;
  orderBy: string;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: string
  ) => void;
}

/**
 * Custom React hook for managing table sorting state.
 *
 * @param {string} [defaultOrderBy=""] - The default column to be sorted initially, if not provided, defaults to an empty string.
 * @returns {object} An object containing sorting state and functions to handle sorting actions.
 */
const useTableSort = (defaultOrderBy: string = ""): UseTableSortReturnType => {
  /**
   * State variables to keep track of the sorting order and column to be sorted.
   */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);

  /**
   * Function to handle request for sorting.
   *
   * @param {React.MouseEvent<unknown>} _event - The mouse event triggering the sort action (not used in this function).
   * @param {string} property - The property (column) to be sorted.
   * @returns {void}
   */
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};

export default useTableSort;
