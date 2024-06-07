import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Firebase/AuthProvider';
import UseAxiosSecure from '../Component/Axios/UseAxiosScoure';
import { FaFacebook } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';

const UserProfile = () => {
    const { user } = useContext(authContext);
    const axiosSecure = UseAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get('/user');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, [axiosSecure]);

    const loggedInUser = users.find((u) => u.email === user?.email);
    console.log(loggedInUser);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center items-center w-full h-screen">
                    <span className="loading loading-ring w-28 h-28"></span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <div className="text-center">
                    {loggedInUser?.photo ? (
                        <img
                            className="w-24 h-24 rounded-full mx-auto"
                            src={loggedInUser?.photo}
                            alt={loggedInUser?.name}
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto"></div>
                    )}
                    <h2 className="text-xl font-semibold mt-4">{loggedInUser?.name}</h2>
                    <p className="text-gray-600">{loggedInUser?.email}</p>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-medium">User Details</h3>
                    <div className="mt-2 text-gray-700">
                        {/* Add more user details as needed */}
                        <p><strong>Role:</strong> {loggedInUser?.role || 'N/A'}</p>
                        <p className='flex items-center'><strong>Status:  {loggedInUser?.status} </strong> <MdVerified /></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
