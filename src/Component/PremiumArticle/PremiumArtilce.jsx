import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../Axios/UseAxiosScoure';

const PremiumArtilce = () => {
        const axiosSecure = UseAxiosSecure();
        const { data: blogs = [], refetch } = useQuery({
          queryKey: ["blogs"],
          queryFn: async () => {
            const res = await axiosSecure.get("/blog");
            return res.data;
          },
        });
        const approvedArticles = blogs.filter(
          (article) => article?.paid === "premium"
        )
    return (
        <div>
            <h1>{approvedArticles.length}</h1>
        </div>
    );
};

export default PremiumArtilce;