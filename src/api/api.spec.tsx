import axios from "axios";
import api from "./api";
import mockRestaurantsList from "../util/mockRestaurantList";

jest.mock("axios");

describe("api", () => {
  it("calls onSuccess and not onError when api call succeeds", async () => {
    const onSuccess = jest.fn().mockName("onSuccess");
    const onError = jest.fn().mockName("onError");

    (axios.get as jest.Mock).mockResolvedValue({
      data: mockRestaurantsList,
    });

    api.getRestaurants(onSuccess, onError);

    // timeout ensures api call completes before check
    setTimeout(() => {
      expect(onSuccess).toHaveBeenCalledWith(mockRestaurantsList);
      expect(onError).not.toHaveBeenCalled();
    }, 100);
  });

  it("calls onError and not onSuccess when api call succeeds", async () => {
    const onSuccess = jest.fn().mockName("onSuccess");
    const onError = jest.fn().mockName("onError");

    (axios.get as jest.Mock).mockRejectedValue(new Error("some error"));

    api.getRestaurants(onSuccess, onError);

    // timeout ensures api call completes before check
    setTimeout(() => {
      expect(onError).toHaveBeenCalledWith("Error loading data");
      expect(onSuccess).not.toHaveBeenCalled();
    }, 100);
  });
});
