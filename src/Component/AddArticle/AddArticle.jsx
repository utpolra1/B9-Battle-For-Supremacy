import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { authContext } from "../../Firebase/AuthProvider";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(authContext);
  const location=useLocation();
  const navigate=useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=40e12a0fb8ad7194b0c97ec21a585d32",
        formData
      );
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Fetching publishers
  const axiosSecure = UseAxiosSecure();
  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  const handleSubmitedArticle = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const publisher = e.target.publisher.value;
    const description = e.target.description.value;
    const tag = e.target.tags.value;
    const email = user?.email;
    const status = "pending";
    const count = 0;
    const username = user?.displayName;
    const userphoto = user?.photoURL;
    const date = new Date().toLocaleString();
    const paid='unpaid';
    const newblog = {
      title,
      description,
      tag,
      publisher,
      image: imageUrl,
      email,
      status,
      count,
      username,
      userphoto,
      date,
      paid
    };

    fetch("http://localhost:5000/blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newblog),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Blog Added Successfully");
        e.target.reset();
        setImageUrl("");
        navigate(location?.state ? location.state : "/");
      });
  };

  return (
    <div className="flex justify-center text-center mt-5">
      <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 border-b-2">
          Add Article
        </h4>

        <form onSubmit={handleSubmitedArticle} className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96">
          <div className="flex flex-col gap-6 mb-1">
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Title
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                placeholder="Title"
                name="title"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                required
              />
            </div>

            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Publisher
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <select
                name="publisher"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                required
              >
                <option value="" disabled selected>
                  Select a publisher
                </option>
                {publishers.map((publisher) => (
                  <option key={publisher._id} value={publisher.name}>
                    {publisher.name}
                  </option>
                ))}
              </select>
            </div>

            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Description
            </h6>
            <div className="relative h-200 w-full min-w-[200px]">
              <textarea
                name="description"
                placeholder="Description"
                className="peer h-[200px] w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                required
              />
            </div>

            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Tags
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="tags"
                placeholder="Tags"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0"
                required
              />
            </div>

            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Image Upload
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input type="file" accept="image/*" onChange={handleImageUpload} required />
            </div>
          </div>

          <div className="inline-flex items-center">
            <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="remember"
                required
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
