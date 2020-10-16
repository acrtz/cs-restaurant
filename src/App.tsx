import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import mockRestaurantList from "./util/mockRestaurantList";
import { FilterState, FilterKey, Restaurant } from "./types";

const defaultFilter = {
  state: [],
  genre: [],
  attire: [],
};

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(
    mockRestaurantList
  );
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Restaurant[] | null
  >(mockRestaurantList);
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  useEffect(() => {
    let filteredRestaurants = restaurants || [];
    const keys = Object.keys(filter) as FilterKey[];

    for (const key of keys) {
      const value = filter[key as FilterKey];
      if (Array.isArray(value)) {
        if (value.length)
          filteredRestaurants = filteredRestaurants.filter((restaurant) => {
            return value.includes(restaurant[key]);
          });
      } else
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          return value === restaurant[key];
        });
    }
    setFilteredRestaurants(filteredRestaurants);
  }, [filter, restaurants]);

  const updateFilter = (
    key: FilterKey,
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
  const clearFilter = (key: FilterKey) => {
    setFilter((current) => {
      return { ...current, [key]: Array.isArray(current[key]) ? [] : null };
    });
  };

  return (
    <Layout
      restaurants={filteredRestaurants}
      filter={filter}
      updateFilter={updateFilter}
      clearFilter={clearFilter}
    />
  );
};

export default App;
