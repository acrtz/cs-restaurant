import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import api from "./api/api";
import { defaultFilter } from "./util/defaultFilter";
import { FilterState, FilterKey, Restaurant, PaginationState } from "./types";

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [pagination, setPagination] = useState<PaginationState>({
    offset: 0,
    limit: 10,
  });
  const [textSearch, setTextSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    if (restaurants === null) {
      api.getRestaurants(setRestaurants, setError);
    } else {
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

      if (textSearch)
        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          //create a case insensitive regex to seach the text
          const regex = new RegExp(textSearch, "i");
          return (
            regex.test(restaurant.name) ||
            regex.test(restaurant.city) ||
            regex.test(restaurant.genre)
          );
        });

      setFilteredRestaurants(filteredRestaurants);
    }
  }, [filter, restaurants, textSearch]);

  console.log({ filteredRestaurants });
  return (
    <Layout
      restaurants={filteredRestaurants.slice(
        pagination.offset,
        pagination.offset + pagination.limit
      )}
      filter={filter}
      setFilter={setFilter}
      textSearch={textSearch}
      setTextSearch={setTextSearch}
      pagination={pagination}
      setPagination={setPagination}
      restaurantCount={filteredRestaurants?.length}
    />
  );
};

export default App;
