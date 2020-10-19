import { Restaurant, FilterKey, FilterState } from '../types';
import STATES from "./states";

export const filterRestaurants = (filter: FilterState, textSearch: string, restaurants: Restaurant[]) => {
  let filteredRestaurants = restaurants || [];
  const keys = Object.keys(filter) as FilterKey[];

  for (const key of keys) {
    const value = filter[key as FilterKey];
    if (Array.isArray(value)) {
      filteredRestaurants = filterWithArrayOfValues(
        filteredRestaurants,
        key,
        value
      );
    } else
      filteredRestaurants = filterWithSingleValue(
        filteredRestaurants,
        key,
        value
      );
  }

  if (textSearch)
    filteredRestaurants = filterByTextSearch(textSearch, filteredRestaurants);

  return filteredRestaurants;
};

const filterWithSingleValue = (
  restaurants: Restaurant[],
  key: FilterKey,
  value: string
) => {
  return restaurants.filter((restaurant) => {
    return RegExp(value, "i").test(restaurant[key]);
  });
};

const filterWithArrayOfValues = (
  restaurants: Restaurant[],
  key: FilterKey,
  value: string[]
) => {
  if (value.length) {
    const regexArray = value.map((v) => new RegExp(v, "i"));
    return restaurants.filter((restaurant) => {
      return regexArray.some((regex) => regex.test(restaurant[key]));
    });
  }
  return restaurants;
};

const filterByTextSearch = (textSearch: string, restaurants: Restaurant[]) => {
  return restaurants.filter((restaurant) => {
    //create a case insensitive regex to seach the text
    const regex = new RegExp(textSearch, "i");
    return (
      regex.test(restaurant.name) ||
      regex.test(restaurant.city) ||
      regex.test(restaurant.genre)
    );
  });
};

export const prepareFilterGroups = (restaurants: Restaurant[]) => ({
  genre: getGenreFromResaurants(restaurants),
  attire: getAttireFromResaurants(restaurants),
  state: getStateFromResaurants(restaurants),
});

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
  return convertFilterObjectToArray(genreObj);
};

const getAttireFromResaurants = (restaurants: Restaurant[]) => {
  const attireObj = restaurants.reduce((acc, restaurant) => {
    return {
      ...acc,
      [restaurant.attire.toLowerCase()]: capitalize(restaurant.attire),
    };
  }, {});
  return convertFilterObjectToArray(attireObj);
};

const getStateFromResaurants = (restaurants: Restaurant[]) => {
  const stateObj = restaurants.reduce((acc, restaurant) => {
    const stateCode = restaurant.state.toUpperCase();
    const stateName = (STATES as {
      [key: string]: string;
    })[stateCode];
    return { ...acc, [stateCode]: stateName || stateCode };
  }, {});
  return convertFilterObjectToArray(stateObj);
};

export const clearFilter = (
  filter: FilterState,
  setFilter: Function,
  key: FilterKey
) => {
  const updatedFilter = {
    ...filter,
    [key]: Array.isArray(filter[key]) ? [] : null,
  };
  setFilter(updatedFilter);
};

export const updateFilter = (
  event: React.ChangeEvent,
  filter: FilterState,
  setFilter: Function,
  key: FilterKey,
  multiple: boolean
) => {
  const clickedValue = (event.target as HTMLInputElement).value;

  let currentValue = filter[key];
  let newValue;

  // multiple indicated filter group can select mulitle options (value and new value are arrays)
  if (multiple) {
    // if clicked value is already select then filter it out of
    if (currentValue.includes(clickedValue)) {
      newValue = currentValue.filter((value) => value !== clickedValue);
    } else {
      newValue = [...currentValue, clickedValue];
    }
  }
  // The following code enables filtering for filter groups where only
  // one value can be selected at a time. Since no such group is used
  // currently typechecks prevent its usage.
  // else {
  //   if (value === clickedValue) newValue = "";
  //   else newValue = clickedValue;
  // }

  setFilter({ ...filter, [key]: newValue });
};

const capitalize = (str: string) =>
`${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;

const convertFilterObjectToArray = (obj: Object) => {
  return Object.entries(obj)
    .reduce((acc: { id: string, name: string }[], entry) => {
      const [id, name] = entry;
      acc.push({ id, name });
      return acc;
    }, [])
    .sort((a, b) => (a.name < b.name ? -1 : 0));
};