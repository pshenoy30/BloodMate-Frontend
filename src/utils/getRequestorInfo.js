import axios from "axios";

async function getRequestorInfo(city) {
  try {
    const response = await axios.get(`http://localhost:8080/user/requestor/${city}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default getRequestorInfo;