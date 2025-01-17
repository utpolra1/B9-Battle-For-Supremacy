import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseHooks from "../Hooks/UseHooks";
import { Card } from "flowbite-react";

const BlogDeatils = () => {
  const { _id } = useParams();
  const [data, setData] = useState([]);
  const { blogs, loading } = UseHooks();

  useEffect(() => {
    if (blogs) {
      const singleData = blogs.find((item) => item._id == _id);
      setData(singleData);
    }
  }, [data, _id]);
  return (
    <div>
      <Card>
        <img className="rounded-lg lg:h-[500px]" src={data?.image} alt="" />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data?.title}
        </h5>
        <h1>
          <span className="font-bold">Publish Date: </span>
          {data?.date}
        </h1>
        <h1>
          <span className="font-bold">Publisher: </span>
          {data?.publisher}
        </h1>
        <h1 className="font-bold">
          {data?.count}
          <span> view</span>
        </h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {data?.description}
        </p>
      </Card>
    </div>
  );
};

export default BlogDeatils;
