import React from 'react';
import TrandingBlog from './TrandingBlog';
import AllArtilce from './AllArtilce';
import UserStatic from './UserStatic';
import PaymentCard from './PaymentCard';

const Home = () => {
    return (
        <div>
            <TrandingBlog></TrandingBlog>
            <AllArtilce></AllArtilce>
            <UserStatic></UserStatic>
            <PaymentCard></PaymentCard>
        </div>
    );
};

export default Home;