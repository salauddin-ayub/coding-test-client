import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://coding-test-server-production.up.railway.app/",
  headers: { "Access-Control-Allow-Origin": "*" },
});
