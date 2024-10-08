import axios from "axios";

async function getDonorInfo(city) {
  try {
    const response = await axios.get(`http://localhost:8080/user/donor/${city}`);
    console.log("http://localhost:8080/user/donor/${city}");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export default getDonorInfo;