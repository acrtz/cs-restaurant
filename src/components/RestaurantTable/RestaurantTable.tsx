import React from "react";
import "./RestaurantTable.css";

export interface RestaurantTableProps {
  restaurants: {
    id: string;
    name: string;
    address1: string;
    city: string;
    state: string;
    zip: string;
    lat: string;
    long: string;
    telephone: string;
    tags: string;
    website: string;
    genre: string;
    hours: string;
    attire: string;
  }[];
}

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
