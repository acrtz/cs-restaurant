import React from "react";
import Layout from "./components/Layout/Layout";
import mockRestaurantList from "./util/mockRestaurantList";

const App: React.FC = () => {
  return <Layout restaurants={mockRestaurantList} />;
};

export default App;
