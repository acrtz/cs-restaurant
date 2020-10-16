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

// TODO: look into type for setter funcitons (setFilter, setTextSearch etc.).
// Is there a better option than 'Function'
export interface FilterProps {
  filter: FilterState;
  setFilter: Function;
}

export interface TextSearchProps {
  textSearch: string;
  setTextSearch: Function;
}

export interface PaginationProps {
  pagination: { offset: number, limit: number }
  setPagination: Function;
  restaurantCount: number | undefined;
}

export interface PaginationState {
  offset: number;
  limit: number;
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
  restaurants: Restaurant[];
}

export interface LayoutProps
  extends FilterProps,
    RestaurantTableProps,
    TextSearchProps,
    PaginationProps {}
