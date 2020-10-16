import React from "react";
import Select from "../Select/Select";
import states from "../../util/states";
import { FilterProps, FilterKey, FilterState } from "../../types";

const Filter: React.FC<FilterProps> = (props) => {
  const updateFilter = (
    key: FilterKey,
    multiple: boolean,
    event: React.ChangeEvent
  ) => {
    const clickedValue = (event.target as HTMLInputElement).value;

    props.setFilter((current: FilterState) => {
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

  const clearFilter = (key: FilterKey) => {
    props.setFilter((current: FilterState) => {
      return { ...current, [key]: Array.isArray(current[key]) ? [] : null };
    });
  };

  const { state, attire, genre } = props.filterGroups;
  return (
    <div>
      Filter:
      <Select
        options={state}
        selected={props.filter.state}
        label="By state"
        clear={clearFilter.bind(null, "state")}
        onChange={updateFilter.bind(null, "state", true)}
      />
      <Select
        options={genre}
        selected={props.filter.genre}
        label="By genre"
        clear={clearFilter.bind(null, "genre")}
        onChange={updateFilter.bind(null, "genre", true)}
      />
      <Select
        options={attire}
        selected={props.filter.attire}
        label="By attire"
        clear={clearFilter.bind(null, "attire")}
        onChange={updateFilter.bind(null, "attire", true)}
      />
    </div>
  );
};

export default Filter;
