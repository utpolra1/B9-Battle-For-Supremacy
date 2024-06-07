import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { authContext } from "../../Firebase/AuthProvider";

const UpdateArticle = () => {
  const { id } = useParams(); // assuming id is a parameter in the route
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(authContext);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const tag = form.tag.value;

    const blogData = {
      title,
      description,
      tag,
      image: imageUrl, // Ensure the uploaded image URL is used
      userphoto: user.photoURL,
    };

    console.log("Submitting the following data:", blogData);

    try {
      const response = await axiosSecure.patch(`/blog/${id}`, blogData);
      console.log('Server response:', response.data);  // Log server response

      if (response.data.modifiedCount > 0) {
        toast.success("Blog Is Updated");
      } else {
        toast.warn("No changes were made to the blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Blog update failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update a Blog
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              name="description"
              id="description"
              cols="30"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700" htmlFor="tag">
              Tag
            </label>
            <input
              id="tag"
              name="tag"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>
          <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 my-5">
            Image Upload
          </h6>
          <div className="relative h-11 w-full min-w-[200px] mt-5">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>
          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transhtmlForm bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateArticle;
