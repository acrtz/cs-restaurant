import React from "react";
import "./RestaurantTable.css";
import { RestaurantTableProps } from "../../types";

const RestaurantTable: React.FC<RestaurantTableProps> = ({ restaurants }) => {
  return (
    <div id="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Telephone</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, i) => (
            <tr key={i} data-testid={`restaurant`}>
              <td>{restaurant.name}</td>
              <td>{restaurant.city}</td>
              <td>{restaurant.state}</td>
              <td>{restaurant.telephone}</td>
              <td>{restaurant.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTable;
