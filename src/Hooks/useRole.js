import { useContext, useState } from "react";
import { authContext } from "../Firebase/AuthProvider";
import UseAxiosSecure from "../Component/Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const {user, loading}=useContext(authContext)
    const axiosSecure =UseAxiosSecure()

    const {data:role, isLoading}=useQuery({
        queryKey:['role', user?.email],
        enabled:!loading && !!user?.email,
        queryFn: async()=>{
            const {data}=await axiosSecure(`/user/${user?.email}`)
            return data.role
        }
    })
    // fetch user info using login
    return [role, isLoading];
};

export default useRole;