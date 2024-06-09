import React, { useEffect } from "react";
import { Button, Card } from "flowbite-react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import ViewDatilsButton from "./ViewDatilsButton";
import { NavLink } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const AllArticle = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh(); // Ensure AOS is aware of any dynamically added elements
  }, []);

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
    <div className="" data-aos="flip-right">
      <h1 className="text-3xl font-bold text-center py-8">All Publisher</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {approvedArticles?.map((blog) => (
          <Card key={blog?._id} data-aos="zoom-in">
            <img className="w-96 rounded-lg h-64" src={blog?.image} alt="" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" data-aos="fade-left">
              {blog?.title}
            </h5>
            <h1>
              <span className="font-bold" data-aos="fade-left">Publish Date: </span>
              {blog?.date}
            </h1>
            <h1>
              <span className="font-bold" data-aos="fade-left">Publisher: </span>
              {blog?.publisher}
            </h1>
            <h1 className="font-bold" data-aos="fade-left">
              {blog?.count}
              <span> view</span>
            </h1>
            <p className="font-normal text-gray-700 dark:text-gray-400" data-aos="fade-left">
              {truncateText(blog?.description, 50)}
            </p>
            <NavLink to={`/blogdetails/${blog?._id}`}>
              <ViewDatilsButton articleId={blog?._id}></ViewDatilsButton>
            </NavLink>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllArticle;
