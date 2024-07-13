import axios from "axios";

const API_URL = "http://localhost:8080"
async function getSiteLocations(city) {
  try {
    const response = await axios.get(`${API_URL}/site/${city}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default getSiteLocations;