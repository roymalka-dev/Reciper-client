export interface routeType {
  path: string;
  key: string;
  component: React.ExoticComponent | React.FC;
  protect?: boolean;
  loader: React.FC;
  authority?: string;
  redirect?: string;
  children?: routeType[];
}
