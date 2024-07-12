import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
async function getSiteLocations(city) {
  try {
    const response = await axios.get(`${API_URL}/site/${city}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default getSiteLocations;