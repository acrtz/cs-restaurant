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

export interface FilterProps {
  filter: FilterState;
  clearFilter: (
    key: FilterKey,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  updateFilter: (
    key: FilterKey,
    multiple: boolean,
    event: React.ChangeEvent
  ) => void;
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
