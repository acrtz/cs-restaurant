import React from "react";
import RestaurantTable, {
  RestaurantTableProps,
} from "../RestaurantTable/RestaurantTable";
import Filter from "../Filter/Filter";
import mockRestaurantList from "../../util/mockRestaurantList";
import "./Layout.css";

const Layout: React.FC<RestaurantTableProps> = () => {
  return (
    <div id="layout">
      <div id="left-panel">
        <Filter filter={{ state: ["OR", "WA"], genre: [], attire: [] }} />
      </div>
      <div id="main-screen">
        <div>search</div>
        <RestaurantTable restaurants={mockRestaurantList} />
      </div>
    </div>
  );
};

export default Layout;
