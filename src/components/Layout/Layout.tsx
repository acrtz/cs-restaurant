import React from "react";
import RestaurantTable from "../RestaurantTable/RestaurantTable";
import Filter from "../Filter/Filter";
import TextSearch from "../TextSearch/TextSearch";
import Pagination from "../Pagination/Pagination";
import { LayoutProps } from "../../types";
import "./Layout.css";

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div id="layout">
      <div id="left-panel">
        <Filter
          filterGroups={props.filterGroups}
          filter={props.filter}
          setFilter={props.setFilter}
        />
      </div>
      <div id="main-screen">
        <TextSearch
          textSearch={props.textSearch}
          setTextSearch={props.setTextSearch}
        />
        <RestaurantTable restaurants={props.restaurants} />
        <Pagination
          pagination={props.pagination}
          setPagination={props.setPagination}
          restaurantCount={props.restaurantCount}
        />
      </div>
    </div>
  );
};

export default Layout;
