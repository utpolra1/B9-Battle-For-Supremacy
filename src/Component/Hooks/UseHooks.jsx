import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Axios/UseAxiosScoure";

const UseHooks = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });
  return { blogs, isLoading};
};

export default UseHooks;
