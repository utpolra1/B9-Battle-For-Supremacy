import React, { useContext } from "react";
import { Table } from "flowbite-react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../../Firebase/AuthProvider";
import { NavLink } from "react-router-dom";
import ViewDatilsButton from "../Home/ViewDatilsButton";
import Swal from "sweetalert2";
import UpdateArticle from "./UpdateArticle";

const MyArticle = () => {
  const { user } = useContext(authContext);
  const axiosSecure = UseAxiosSecure();

  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });

  const userBlogs = blogs.filter((blog) => blog.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/blog/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your blog has been deleted.",
                icon: "success",
              });

              const remainingBlogs = blogs.filter((blog) => blog._id !== id);
              refetch();
            }
          })
          .catch((error) => {
            console.error("Error deleting blog:", error);
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting your blog.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Sr.NO</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>isPremium</Table.HeadCell>
            <Table.HeadCell>Datils</Table.HeadCell>
            <Table.HeadCell>Update</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userBlogs.map((data, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{data?.title}</Table.Cell>
                <Table.Cell>{data?.status}</Table.Cell>
                <Table.Cell>{data?.paid}</Table.Cell>
                <Table.Cell>
                  <NavLink to={`/blogdetails/${data?._id}`}>
                    <ViewDatilsButton articleId={data?._id}></ViewDatilsButton>
                  </NavLink>
                </Table.Cell>
                <Table.Cell>
                  <NavLink to={`/updateBlog/${data?._id}`}>
                    <button className="btn m-10">Update Blog</button>
                  </NavLink>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="btn"
                    onClick={() => handleDelete(data?._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyArticle;
