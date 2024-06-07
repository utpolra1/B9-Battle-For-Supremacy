import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../Firebase/AuthProvider";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const SubscribePremium = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const paidUser = users.find((u) => u.email === user?.email);

  if (paidUser?.paid === "paid") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default SubscribePremium;
