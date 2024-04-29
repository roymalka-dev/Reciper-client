export const comperators = {
  string: (a: string, b: string) => a?.localeCompare(b),
  number: (a: number, b: number) => a - b,
  date: (a: string, b: string) =>
    new Date(a)?.getTime() - new Date(b)?.getTime(),
};
