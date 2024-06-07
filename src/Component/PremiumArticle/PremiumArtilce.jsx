import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import ViewDatilsButton from "../Home/ViewDatilsButton";
import { NavLink } from "react-router-dom";

// Helper function to truncate text
const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

const PremiumArticle = () => {
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
  );

  return (
    <div>
      <h1>Premium Articles</h1>
      {approvedArticles.map((article) => (
        <div className="article card border w-1/2 my-5 p-2">
          {article.image && (
            <img
              className="mx-auto rounded-lg w-[500px] h-[350px]"
              src={article.image}
              alt={article.title}
            />
          )}
          <h2 className="">{article.title}</h2>
          <p>
            <strong>Tags:</strong> {article.tag}
          </p>
          <p>
            <strong>Date:</strong> {article.date}
          </p>
          <p>
            <strong>Publisher:</strong> {article.publisher}
          </p>
          {truncateText(article?.description, 50)}
          <NavLink to={`/blogdetails/${article?._id}`}>
            <ViewDatilsButton articleId={article?._id}></ViewDatilsButton>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default PremiumArticle;
