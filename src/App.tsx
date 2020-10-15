import React from "react";
import RestaurantTable from "./components/RestaurantTable/RestaurantTable";
import Filter from "./components/Filter/Filter";
import mockRestaurantList from "./util/mockRestaurantList";

const App: React.FC = () => {
  return (
    <div className="App">
      <Filter filter={{ state: ["OR", "WA"], genre: [], attire: [] }} />
      <RestaurantTable restaurants={mockRestaurantList} />
    </div>
  );
};

export default App;
