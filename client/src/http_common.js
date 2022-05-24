import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:42591/",
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
}); 