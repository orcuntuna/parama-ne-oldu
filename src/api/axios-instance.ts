import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://finans.truncgil.com/v3"
});
