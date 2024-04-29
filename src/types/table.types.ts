/* eslint-disable @typescript-eslint/no-explicit-any */
export type tableRowsType = {
  [key: string]: any;
};

export type TableColsType = {
  name: string;
  locale?: string;
  render: (value: any, id?: any) => JSX.Element;
  comparator?: (a: any, b: any) => number;
};

export type TableDataType = {
  cols: TableColsType[];
  rows: tableRowsType[];
  toolbar?: React.ReactNode;
};
