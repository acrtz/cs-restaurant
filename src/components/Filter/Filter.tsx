import React from "react";
import Select from "../Select/Select";
import states from "../../util/states";
import { FilterProps } from "../../types";

const Filter: React.FC<FilterProps> = (props) => {
  return (
    <div>
      Filter:
      <Select
        options={states}
        selected={props.filter.state}
        label="By state"
        clear={props.clearFilter.bind(null, "state")}
        onChange={props.updateFilter.bind(null, "state", true)}
      />
    </div>
  );
};

export default Filter;
