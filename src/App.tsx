import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import api from "./api/api";
import { filterRestaurants, prepareFilterGroups } from "./util/filterUtilities";
import { Restaurant, FilterGroupStructure } from "./types";

const DEFAULT_FILTER = {
  state: [] as string[],
  genre: [] as string[],
  attire: [] as string[],
};

const DEFAULT_PAGINATION = {
  offset: 0,
  limit: 10,
};

const App: React.FC = () => {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [filterGroups, setFilterGroups] = useState<FilterGroupStructure>({
    state: [],
    genre: [],
    attire: [],
  });
  const [textSearch, setTextSearch] = useState("");
  const [error, setError] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    if (restaurants === null) {
      api.getRestaurants(onGetRestaurantSuccess, setError);
    } else {
      const filteredRestaurants = filterRestaurants(
        filter,
        textSearch,
        restaurants
      );
      setFilteredRestaurants(filteredRestaurants);
      setPagination(DEFAULT_PAGINATION);
    }
  }, [filter, restaurants, textSearch]);

  const onGetRestaurantSuccess = (restaurants: Restaurant[]) => {
    const filterGroups = prepareFilterGroups(restaurants);
    setFilterGroups(filterGroups);
    setRestaurants(restaurants);
  };

  return (
    <Layout
      restaurants={filteredRestaurants.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      )}
      filter={filter}
      setFilter={setFilter}
      filterGroups={filterGroups}
      textSearch={textSearch}
      setTextSearch={setTextSearch}
      pagination={pagination}
      setPagination={setPagination}
      restaurantCount={filteredRestaurants?.length}
    />
  );
};

export default App;
