import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://b9-battle-for-supremacy-server.vercel.app",
  withCredentials: true,
});

const UseAxiosSecure = () => {
  return axiosSecure;
};

export default UseAxiosSecure;
