import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import mockRestaurantList from "./util/mockRestaurantList";
import { defaultFilter } from "./util/defaultFilter";
import { FilterState, FilterKey, Restaurant } from "./types";

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(
    mockRestaurantList
  );
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    Restaurant[] | null
  >(mockRestaurantList);

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

  return (
    <Layout
      restaurants={filteredRestaurants}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default App;
