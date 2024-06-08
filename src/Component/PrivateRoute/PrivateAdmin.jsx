import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../../Firebase/AuthProvider";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const PrivateAdmin = ({ children }) => {
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

  const adminUser = users.find((u) => u.email === user?.email);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center w-full h-screen">
          <span className="loading loading-ring w-28 h-28"></span>
        </div>
      </div>
    ); // or a spinner
  }

  if (adminUser?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default PrivateAdmin;
