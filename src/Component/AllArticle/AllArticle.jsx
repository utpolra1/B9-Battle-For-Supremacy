import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
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

const AllArticle = () => {
  const axiosSecure = UseAxiosSecure();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [publisher, setPublisher] = useState(" ");

  const approvedArticles = data.filter(
    (article) => article.status === "approve"
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/allblog?filter=${filter}&search=${search}&publisher=${publisher}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [filter, publisher, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  return (
    <div className="my-10">
      <div className="justify-center py-5 grid gap-3 lg:grid-cols-3">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          name="tag"
          id="tag"
          className="border p-3 rounded-lg"
        >
          <option value="">Filter By Tag</option>
          <option value="news">News</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
        </select>
        <select
          onChange={(e) => setPublisher(e.target.value)} // Change to setPublisherFilter
          value={publisher}
          name="publisher"
          id="publisher"
          className="border p-3 rounded-lg"
        >
          <option value="">Filter By Publisher</option>
          <option value="utpolra">utpolra</option>
          <option value="utpolray">utpolray</option>
        </select>
        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              placeholder="Enter Search Text"
              aria-label="Enter Search Text"
            />
            <button className="px-1 md:px-4 py-4 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <span className="loading loading-ring w-28 h-28"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {approvedArticles?.map((article, index) => (
            <Card key={index} className="">
              <img src={
                article?.image
              } alt="" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
              <div>
              <h1><span className="font-bold">Publish Date: </span>{article?.date}</h1>
            <h1><span className="font-bold">Publisher: </span>{article?.publisher}</h1>
            <h1 className="font-bold">{article?.count}<span> view</span></h1>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
              {truncateText(article?.description, 40)}
              </p>
              <p>#{article.tag}</p>
              <NavLink to={`/blogdetails/${article?._id}`}><ViewDatilsButton articleId={article?._id}></ViewDatilsButton></NavLink>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllArticle;
