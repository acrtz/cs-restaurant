export interface FilterState {
  state: string[];
  genre: string[];
  attire: string[];
}

export type filterKeys = "state" | "genre" | "attire";

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
    key: filterKeys,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  updateFilter: (
    key: filterKeys,
    multiple: boolean,
    event: React.ChangeEvent
  ) => void;
}

export interface RestaurantTableProps {
  restaurants: {
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
  }[];
}

export interface LayoutProps extends FilterProps, RestaurantTableProps {}
