import React from "react";
import RestaurantTable from "./components/RestaurantTable/RestaurantTable";
import mockRestaurantList from "./util/mockRestaurantList";

const App: React.FC = () => {
  return (
    <div className="App">
      <RestaurantTable restaurants={mockRestaurantList} />
    </div>
  );
};

export default App;
