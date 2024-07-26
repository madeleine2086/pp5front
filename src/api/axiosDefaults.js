import axios from "axios";

axios.defaults.baseURL = 'https://pp5-backend-d8f71e1af953.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();