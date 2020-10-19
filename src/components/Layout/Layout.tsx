import React, { useState } from "react";
import RestaurantTable from "../RestaurantTable/RestaurantTable";
import Filter from "../Filter/Filter";
import TextSearch from "../TextSearch/TextSearch";
import Pagination from "../Pagination/Pagination";
import FilterIcon from "../../icons/filter";
import CloseIcon from "../../icons/close";
import { LayoutProps } from "../../types";
import "./Layout.css";

const Layout: React.FC<LayoutProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const noMatchesFound = !props.loading && !props.restaurants.length;
  return (
    <div
      id="layout"
      onClick={() => {
        open && setOpen(false);
      }}
    >
      <div
        id="left-panel"
        className={`${open ? "open" : ""}-filter`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="open-close-filter"
          className={`${open ? "open" : ""}-filter`}
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <FilterIcon />}
        </button>
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
        {noMatchesFound ? (
          <div id="no-matches">No matches found</div>
        ) : (
          <>
            <RestaurantTable
              loading={props.loading}
              restaurants={props.restaurants}
            />
            <Pagination
              pagination={props.pagination}
              setPagination={props.setPagination}
              restaurantCount={props.restaurantCount}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
