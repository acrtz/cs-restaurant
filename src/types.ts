export interface FilterState {
  state: string[];
  genre: string[];
  attire: string[];
}

export type FilterKey = "state" | "genre" | "attire";

export interface SelectProps {
  selected: string | string[];
  options: { id: string; name: string }[];
  onChange: (event: React.ChangeEvent) => void;
  multiple?: boolean;
  label?: string;
  clear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: look into type for setFilter function.
// Is there a better option than 'Function'
export interface FilterProps {
  filter: FilterState;
  setFilter: Function;
}

export interface Restaurant {
  id: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  lat: string;
  long: string;
  telephone: string;
  tags: string;
  website: string;
  genre: string;
  hours: string;
  attire: string;
}

export interface RestaurantTableProps {
  restaurants: Restaurant[] | null;
}

export interface LayoutProps extends FilterProps, RestaurantTableProps {}
