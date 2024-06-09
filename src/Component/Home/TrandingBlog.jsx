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
    <Carousel className="rounded-xl lg:max-h-[800px]">
      {topArticles.map((article, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={article?.image}
            alt="image 2"
            className="h-full w-full object-cover min-h-[350px] lg:max-h-[800px]"
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
              className="mb-4 opacity-80 text-sm text-center"
            >
              {truncateText(article.description, 20)}
            </Typography>
            <p className="my-2 text-xs font-extrabold items-center justify-evenly flex">
              {article.count} view
            </p>
            <div className="flex justify-center">
              <NavLink to={`/blogdetails/${article._id}`}>
                <Button className="" onClick={() => handleCount(article._id)}>
                  Read more
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default TrandingBlog;
