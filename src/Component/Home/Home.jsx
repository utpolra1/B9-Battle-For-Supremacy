import React from 'react';
import TrandingBlog from './TrandingBlog';
import AllArtilce from './AllArtilce';
import UserStatic from './UserStatic';
import PaymentCard from './PaymentCard';
import SubsCribepage from './SubsCribepage';

const Home = () => {
    return (
        <div>
            <TrandingBlog></TrandingBlog>
            <AllArtilce></AllArtilce>
            <UserStatic></UserStatic>
            <PaymentCard></PaymentCard>
            <SubsCribepage></SubsCribepage>
        </div>
    );
};

export default Home;