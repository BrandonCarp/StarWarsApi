import axios from "axios";

const SW_API_BASE_URL = process.env.SW_API_BASE_URL ?? "https://swapi.dev";

export const fetchPeople = async (page = 1) => {
  const { data } = await axios.get(
    `${SW_API_BASE_URL}/api/people/?page=${page}`
  );
  return data.results;
};
