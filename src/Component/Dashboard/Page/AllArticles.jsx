import React from "react";
import { Table } from "flowbite-react";
import UseAxiosSecure from "../../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AllArticles = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });
  const handleMakeApprove = (blogs) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    })
    .then((result)=>{
      if(result.isConfirmed){
        axiosSecure.patch(`/blog/aproved/${blogs._id}`)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Approved!",
              text: "Your blog has been Approved.",
              icon: "success",
            });
            refetch();
            toast.success("blog Approved Sucesss");
          }
        });
      }
    })
  };

  //handle delete
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

  //blogs Decline
  const handleDecline = (blogs) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/blog/decline/${blogs._id}`).then((res) => {
          console.log(blogs._id);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Decline!",
              text: "Your blog has been decline.",
              icon: "success",
            });
            refetch();
            toast.success("Blog Decline Success");
          }
        });
      }
    });
  };

  //blogPremium
  const handlePremium = (blogs) => {
    axiosSecure.patch(`/blog/premium/${blogs._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("blog premium Sucesss");
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>author name</Table.HeadCell>
            <Table.HeadCell>author email</Table.HeadCell>
            <Table.HeadCell>author photo</Table.HeadCell>
            <Table.HeadCell>Posted Date</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell>Publisher</Table.HeadCell>
            <Table.HeadCell>Approve button</Table.HeadCell>
            <Table.HeadCell>Decline button</Table.HeadCell>
            <Table.HeadCell>Delete button</Table.HeadCell>
            <Table.HeadCell>Make premium</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {blogs?.map((blogs) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{blogs?.title}</Table.Cell>
                <Table.Cell>{blogs?.username}</Table.Cell>
                <Table.Cell>{blogs?.email}</Table.Cell>
                <Table.Cell>
                  <img src={blogs?.userphoto}></img>{" "}
                </Table.Cell>
                <Table.Cell>{blogs?.date}</Table.Cell>
                <Table.Cell>{blogs?.status}</Table.Cell>
                <Table.Cell>{blogs?.publisher}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleMakeApprove(blogs)}
                    className="btn"
                    disabled={blogs?.status === "approve"}
                  >
                    Approve Now
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button onClick={()=>handleDecline(blogs)} disabled={blogs?.status === "Decline"} className="btn">Decline</button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="btn"
                    onClick={() => handleDelete(blogs?._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handlePremium(blogs)}
                    className="btn"
                    disabled={blogs?.paid === "premium"}
                  >
                    Premium
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

export default AllArticles;
