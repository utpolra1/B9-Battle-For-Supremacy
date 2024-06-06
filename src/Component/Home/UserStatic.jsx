import React from "react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const UserStatic = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });
  const paiduser = users.filter(users => users?.paid === 'paid'); // Use find instead of filter
  const normaluser =(users.length - paiduser.length);
  return (
    <div>
      <div className="stats shadow my-10 flex items-center">
        <div className="stat place-items-center">
          <div className="stat-title">All user</div>
          <div className="stat-value">{users?.length}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Normal User</div>
          <div className="stat-value text-secondary">{normaluser}</div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Premium users</div>
          <div className="stat-value">{paiduser?.length}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatic;
