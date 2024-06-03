import React from 'react';
import TrandingBlog from './TrandingBlog';
import AllArtilce from './AllArtilce';
import UserStatic from './UserStatic';

const Home = () => {
    return (
        <div>
            <TrandingBlog></TrandingBlog>
            <AllArtilce></AllArtilce>
            <UserStatic></UserStatic>
        </div>
    );
};

export default Home;