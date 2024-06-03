import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";

const AllArticle = () => {
  const axiosSecure = UseAxiosSecure();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(
          `/allblog?filter=${filter}&search=${search}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [filter, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  return (
    <div>
      <div className="flex justify-center py-5">
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
          {data.map((article, index) => (
            <Card key={index} className="">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {article.description}
              </p>
              <p>{article.tag}</p>
              <Button>
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
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllArticle;
