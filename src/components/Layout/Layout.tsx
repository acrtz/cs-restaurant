import React from "react";
import RestaurantTable from "../RestaurantTable/RestaurantTable";
import Filter from "../Filter/Filter";
import { LayoutProps } from "../../types";
import "./Layout.css";

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div id="layout">
      <div id="left-panel">
        <Filter
          filter={props.filter}
          updateFilter={props.updateFilter}
          clearFilter={props.clearFilter}
        />
      </div>
      <div id="main-screen">
        <div>search</div>
        <RestaurantTable restaurants={props.restaurants} />
      </div>
    </div>
  );
};

export default Layout;
