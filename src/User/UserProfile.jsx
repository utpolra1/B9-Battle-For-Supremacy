import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../Firebase/AuthProvider';
import UseAxiosSecure from '../Component/Axios/UseAxiosScoure';

const UserProfile = () => {
    const { user } = useContext(authContext);
    const axiosSecure = UseAxiosSecure();
    const [users, setUsers] = useState([]); // Initial state should be an empty array
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

    // Find the logged-in user from the fetched users
    const loggedInUser = users.find((u) => u.email === user?.email);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {loggedInUser ? (
                <div>
                    <h2>{loggedInUser.name}</h2>
                    <p>{loggedInUser.email}</p>
                    {/* Display other user data as needed */}
                </div>
            ) : (
                <div>User not found</div>
            )}
        </div>
    );
};

export default UserProfile;
