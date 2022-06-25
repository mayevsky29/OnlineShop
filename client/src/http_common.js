import axios from "axios";

export default axios.create({
  baseURL: "https://studyshop.pp.ua/",
  //baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
}); 