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
  console.log({ state });
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
    </div>
  );
};

export default Filter;
