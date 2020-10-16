import axios from "axios";

const getRestaurants = async (onSuccess: Function, onError: Function) =>
  axios
    .get("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      method: "GET",
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    })
    .then(({ data }) => onSuccess(data))
    .catch((_) => onError("Error loading data"));

export default {
  getRestaurants,
};
