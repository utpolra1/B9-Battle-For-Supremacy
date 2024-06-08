import React, { useState } from "react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";
import { Carousel, Typography } from "@material-tailwind/react";

// Helper function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const TrandingBlog = () => {
  const axiosSecure = UseAxiosSecure();
  const [count, setCount] = useState("1");

  const handleCount = (id) => {
    fetch(`http://localhost:5000/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: count }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Count updated successfully:", data);
      })
      .catch((error) => {
        console.error("There was a problem updating the count:", error);
      });
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const approvedArticles = blogs.filter(
    (article) => article.status === "approve"
  );

  approvedArticles.sort((a, b) => {
    const countA = Number(a.count);
    const countB = Number(b.count);
    return countB - countA;
  });

  const topArticles = approvedArticles.slice(0, 5);

  return (
    <Carousel className="rounded-xl">
      {topArticles.map((article, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={article?.image}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-75 text-white p-4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-sm lg:text-3xl text-center"
            >
              {article.title}
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-4 opacity-80 text-sm"
            >
              {truncateText(article.description, 40)}
            </Typography>
            <div className="flex justify-center">
              <NavLink to={`/blogdetails/${article._id}`}>
                <Button className="" onClick={() => handleCount(article._id)}>
                  Read more
                </Button>
              </NavLink>
            </div>
            <p className="mt-2 text-xs font-extrabold justify-start flex">
              {article.count} view
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default TrandingBlog;
