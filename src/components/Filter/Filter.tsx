import React from "react";

interface FilterProps {
  filter: {
    state: string;
    genre: string[];
    attire: string[];
  };
}

const Filter: React.FC<FilterProps> = ({ filter }) => {
  return <div>Filter</div>;
};

export default Filter;
