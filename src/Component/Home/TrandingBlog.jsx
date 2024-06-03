import React from "react";
import { createRoot } from "react-dom/client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const TrandingBlog = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });
  const approvedArticles = blogs.filter(
    (article) => article.status === "approve"
  );

  const onChange = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
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
      {approvedArticles.map((article, index) => (
        <div key={index}>
          <img src={article.image} alt={`Legend ${index + 1}`} />
          <p className="legend text-white">{article.title}</p>
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
