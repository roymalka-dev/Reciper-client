import { TableDataType } from "@/types/table.types";

export const tableDataGenerator = ({
  rows,
  cols,
  toolbar,
}: TableDataType): TableDataType => {
  return {
    toolbar,
    cols,
    rows,
  };
};
