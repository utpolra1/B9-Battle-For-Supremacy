import React, { useState } from "react";
import UseAxiosSecure from "../../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { GrUserAdmin } from "react-icons/gr";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const handleMakeAdmin=user=>{
    axiosSecure.patch(`/user/admin/${user._id}`)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            refetch()
            toast.success('Admin sucesss')
        }
    })
  }
  return (
    <div className="overflow-x-auto">
        <div>{users.email}</div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                Sr.
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Make a Admin</th>
          </tr>
        </thead>
        {users?.map((data, index) => (
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    {index+1}
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={data?.photo}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-black">
                  {data?.email}
                </td>
                <th>
                 {
                    data.role ==='admin' ? 'Admin' : <button onClick={()=>handleMakeAdmin(data)} className="btn btn-ghost btn-xs"><GrUserAdmin></GrUserAdmin> Make Admin</button>
                 }
                </th>
              </tr>
            </tbody>
        ))}
      </table>
    </div>
  );
};

export default AllUsers;
