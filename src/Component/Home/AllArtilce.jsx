import React from "react";
import { Button, Card } from "flowbite-react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import ViewDatilsButton from "./ViewDatilsButton";
import { NavLink } from "react-router-dom";

// Loader Component
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center w-full h-screen">
        <span className="loading loading-ring w-28 h-28"></span>
      </div>
    </div>
  );
};

// Helper function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const AllArtilce = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: blogs = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const approvedArticles = blogs.filter(
    (article) => article.status === "approve"
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8">All Publisher</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {approvedArticles?.map((blogs) => (
          <Card key={blogs?._id}>
            <img className="w-96 rounded-lg h-64" src={blogs?.image} alt="" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {blogs?.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {truncateText(blogs?.description, 50)}
            </p>
            <NavLink to={`/blogdetails/${blogs?._id}`}>
              <ViewDatilsButton articleId={blogs?._id}></ViewDatilsButton>
            </NavLink>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllArtilce;
