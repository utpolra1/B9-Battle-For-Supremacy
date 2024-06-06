import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { authContext } from "../../../Firebase/AuthProvider";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState("");
  const [publisherLogo, setPublisherLogo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useContext(authContext);
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setPublisherLogo(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    // If image upload URL is not set, wait until it's available
    if (!imageUrl) {
      alert("Please wait until the image is uploaded.");
      setUploading(false);
      return;
    }

    const publisherData = {
      name: publisherName,
      logo: imageUrl,
    };

    try {
      await axios.post("http://localhost:5000/publishers", publisherData); // Replace with your backend endpoint
      toast.success("Publisher added successfully");
      setPublisherName("");
      setPublisherLogo(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error adding publisher:", error);
      toast.error("Failed to add publisher");
    } finally {
      setUploading(false);
    }
  };

  ///data get and show
  const axiosSecure = UseAxiosSecure();
  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Publisher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="publisherName"
            className="block text-sm font-medium text-gray-700"
          >
            Publisher Name
          </label>
          <input
            type="text"
            id="publisherName"
            value={publisherName}
            onChange={(e) => setPublisherName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="publisherLogo"
            className="block text-sm font-medium text-gray-700"
          >
            Publisher Logo
          </label>
          <input
            type="file"
            id="publisherLogo"
            onChange={handleImageUpload}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {uploading ? "Uploading..." : "Add Publisher"}
        </button>
      </form>

      <div>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Publishers</h2>
          <ul>
            {publishers.map((publisher) => (
              <li key={publisher._id} className="mb-4 p-4 border rounded">
                <img
                  src={publisher.logo}
                  alt={publisher.name}
                  className="w-16 h-16 mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold">{publisher.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPublisher;
