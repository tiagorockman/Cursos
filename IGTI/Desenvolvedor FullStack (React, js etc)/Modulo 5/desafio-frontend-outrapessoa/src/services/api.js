import axios from "axios";

const api = axios.create({
  baseURL: "https://jesstoselli-igtifullstack.herokuapp.com/api/transaction/",
});

export default api;
