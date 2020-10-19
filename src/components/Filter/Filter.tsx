import React from "react";
import Select from "../Select/Select";
import { FilterProps, FilterKey } from "../../types";
import { clearFilter, updateFilter } from "../../util/filterUtilities";

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <div>
      Filter:
      {(["state", "genre", "attire"] as FilterKey[]).map(
        (filterKey: FilterKey, i) => {
          const options = props.filterGroups[filterKey];
          const { filter, setFilter } = props;
          // check to make sure Select options array isnt empty
          return options.length ? (
            <Select
              key={i}
              options={options}
              selected={filter[filterKey]}
              label={`By ${filterKey}`}
              clear={() => clearFilter(filter, setFilter, filterKey)}
              onChange={(e) =>
                updateFilter(e, filter, setFilter, filterKey, true)
              }
            />
          ) : null;
        }
      )}
    </div>
  );
};

export default Filter;
