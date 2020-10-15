import React, { useState } from "react";
import Select from "../Select/Select";
import states from "../../util/states";
import { ChangeEvent } from "react";

interface FilterState {
  state: string[];
  genre: string[];
  attire: string[];
}

type filterKeys = "state" | "genre" | "attire";

interface FilterProps {
  filter: FilterState;
}

const defaultFilter = {
  state: [],
  genre: [],
  attire: [],
};

const Filter: React.FC<FilterProps> = (props) => {
  const [filter, setFilter] = useState<FilterState>(defaultFilter);

  const updateFilter = (
    key: filterKeys,
    multiple: boolean,
    event: ChangeEvent
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
  const clearFilter = (key: filterKeys | null) => {
    if (key)
      setFilter((current) => {
        return { ...current, [key]: Array.isArray(current[key]) ? [] : null };
      });
    else setFilter(defaultFilter);
  };

  return (
    <div>
      Filter:
      <Select
        options={states}
        selected={filter.state}
        label="By state"
        clear={clearFilter.bind(null, "state")}
        onChange={updateFilter.bind(null, "state", true)}
      />
    </div>
  );
};

export default Filter;
