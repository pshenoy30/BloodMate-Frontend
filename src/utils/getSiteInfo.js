import axios from "axios";

async function getSiteLocations(city) {
  try {
    const response = await axios.get(`http://localhost:8080/site/${city}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default getSiteLocations;
