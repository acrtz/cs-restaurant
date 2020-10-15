import React from "react";
import Select from "../Select/Select";
import states from "../../util/states";

interface FilterProps {
  filter: {
    state: string[];
    genre: string[];
    attire: string[];
  };
}

const Filter: React.FC<FilterProps> = ({ filter }) => {
  return (
    <div>
      Filter:
      <Select
        options={states}
        selected={filter.state}
        onChange={(e) => {
          console.log({ e });
        }}
      />
    </div>
  );
};

export default Filter;
