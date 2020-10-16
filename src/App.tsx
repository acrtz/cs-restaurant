import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import api from "./api/api";
import STATES from "./util/states";
import { defaultFilter } from "./util/defaultFilter";
import convertObjectToArray from "./util/convertObjectToArray";
import {
  FilterState,
  FilterKey,
  Restaurant,
  PaginationState,
  FilterGroupStructure,
} from "./types";

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [pagination, setPagination] = useState<PaginationState>({
    offset: 0,
    limit: 10,
  });
  const [filterGroups, setFilterGroups] = useState<FilterGroupStructure>({
    state: [],
    genre: [],
    attire: [],
  });
  const [textSearch, setTextSearch] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  const onGetRestaurantSuccess = (restaurants: Restaurant[]) => {
    const genre = getGenreFromResaurants(restaurants);
    const attire = getAttireFromResaurants(restaurants);
    const state = getStateFromResaurants(restaurants);

    setRestaurants(restaurants);

    setFilterGroups({
      genre,
      attire,
      state,
    });
  };

  const capitalize = (str: string) =>
    `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;

  const getGenreFromResaurants = (restaurants: Restaurant[]) => {
    const genreObj = restaurants
      .reduce((acc, { genre }) => {
        return `${acc},${genre.toLowerCase()}`;
      }, "")
      .split(",")
      .filter((x) => x) // remove emptry string
      .reduce((acc, genre) => {
        return {
          ...acc,
          [genre]: capitalize(genre),
        };
      }, {});
    return convertObjectToArray(genreObj);
  };

  const getAttireFromResaurants = (restaurants: Restaurant[]) => {
    const attireObj = restaurants.reduce((acc, restaurant) => {
      return {
        ...acc,
        [restaurant.attire.toLowerCase()]: capitalize(restaurant.attire),
      };
    }, {});
    return convertObjectToArray(attireObj);
  };

  const getStateFromResaurants = (restaurants: Restaurant[]) => {
    const stateObj = restaurants.reduce((acc, restaurant) => {
      const stateCode = restaurant.state.toUpperCase();
      const stateName = (STATES as {
        [key: string]: string;
      })[stateCode];
      return { ...acc, [stateCode]: stateName || stateCode };
    }, {});
    return convertObjectToArray(stateObj);
  };

  useEffect(() => {
    if (restaurants === null) {
      api.getRestaurants(onGetRestaurantSuccess, setError);
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
