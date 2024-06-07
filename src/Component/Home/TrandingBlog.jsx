import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

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

  approvedArticles.sort((a, b) => {
    const countA = Number(a.count);
    const countB = Number(b.count);
    return countB - countA;
  });

  const topArticles = approvedArticles.slice(0, 5);

  const onChange = (index, item) => {
    console.log(`Item ${index} changed:`, item);
  };

  const onClickItem = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
  };

  const onClickThumb = (index, item) => {
    console.log(`Thumbnail ${index} clicked:`, item);
  };

  return (
    <Carousel
      showArrows={true}
      onChange={onChange}
      onClickItem={onClickItem}
      onClickThumb={onClickThumb}
    >
      {topArticles.map((article, index) => (
        <div key={index}>
          <img src={article.image} alt={`Legend ${index + 1}`} />
          <div className="legend">
            <p className="text-white mb-3">{article.title}</p>
            <h1>{truncateText(article?.description, 40)}</h1>
            <div className="flex justify-end">
              <NavLink to={`/blogdetails/${article?._id}`}>
                <Button onClick={() => handleCount(article?._id)}>
                  Read more
                </Button>
              </NavLink>
            </div>
            <h1 className="justify-start flex items-center text-center font-extrabold">
              {article?.count} view{" "}
            </h1>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default TrandingBlog;

// Render the component
const container = document.querySelector(".demo-carousel");
if (container) {
  const root = createRoot(container);
  root.render(<TrandingBlog />);
} else {
  console.error("Target container is not a DOM element.");
}
