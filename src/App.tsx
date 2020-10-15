import React, { useState } from "react";
import Layout from "./components/Layout/Layout";
import mockRestaurantList from "./util/mockRestaurantList";
import { FilterState, filterKeys } from "./types";

const defaultFilter = {
  state: [],
  genre: [],
  attire: [],
};

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  const updateFilter = (
    key: filterKeys,
    multiple: boolean,
    event: React.ChangeEvent
  ) => {
    const clickedValue = (event.target as HTMLInputElement).value;

    setFilter((current: FilterState) => {
      let value = current[key];
      let newValue;

      if (!multiple) {
        newValue = clickedValue;
      } else {
        if (value.includes(clickedValue)) {
          newValue = value.filter((value) => value !== clickedValue);
        } else {
          newValue = [...value, clickedValue];
        }
      }

      return { ...current, [key]: newValue };
    });
  };

  // clears single filter if key is provided or all filters
  // when not key is provided
  const clearFilter = (key: filterKeys) => {
    setFilter((current) => {
      return { ...current, [key]: Array.isArray(current[key]) ? [] : null };
    });
  };

  return (
    <Layout
      restaurants={mockRestaurantList}
      filter={filter}
      updateFilter={updateFilter}
      clearFilter={clearFilter}
    />
  );
};

export default App;
