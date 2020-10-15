import React from "react";

interface RestaurantListProps {
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

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <table>
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
  );
};

export default RestaurantList;
