import { render } from "@testing-library/react";
import React from "react";
import RestaurantTable from "./RestaurantTable";
import mockRestaurantList from "../../util/mockRestaurantList";

describe("shows a table of restaurants including name, city, state, phone number, and genres for each restaurant. ", () => {
  const { queryByText } = render(
    <RestaurantTable restaurants={mockRestaurantList} />
  );

  it("shows name, city, state, phone number, and genres", () => {
    expect(queryByText("Old Hickory Steakhouse")).not.toBeNull();
    expect(queryByText("Oxon Hill")).not.toBeNull();
    expect(queryByText("MD")).not.toBeNull();
    expect(queryByText("(301) 965-4000")).not.toBeNull();
    expect(
      queryByText("Steak,American,Contemporary,Seafood,Cafe")
    ).not.toBeNull();
  });
});
