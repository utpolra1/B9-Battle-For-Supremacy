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
        <img className="w-96 rounded-lg h-64" src={data?.image} alt="" />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data?.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {data?.description}
        </p>
      </Card>
    </div>
  );
};

export default BlogDeatils;
