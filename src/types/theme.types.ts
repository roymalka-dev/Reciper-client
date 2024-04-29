export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeState = {
  mode: "light" | "dark";
  direction: "ltr" | "rtl";
};
