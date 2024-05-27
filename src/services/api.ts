import axios from "axios";


const api = axios.create({
  baseURL: "http://10.50.0.82:3333",
})


export { api };