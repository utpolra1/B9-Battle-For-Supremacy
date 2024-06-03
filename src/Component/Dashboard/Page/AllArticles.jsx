import React from "react";
import { Table } from "flowbite-react";
import UseAxiosSecure from "../../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    axiosSecure.patch(`/blog/aproved/${blogs._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("blog Approved Sucesss");
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
                <Table.Cell>{blogs?.title}</Table.Cell>
                <Table.Cell>{blogs?.email}</Table.Cell>
                <Table.Cell>{blogs?.photo}</Table.Cell>
                <Table.Cell>{blogs?.title}</Table.Cell>
                <Table.Cell>{blogs?.status}</Table.Cell>
                <Table.Cell>{blogs?.publisher}</Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => handleMakeApprove(blogs)}
                    className="btn"
                  >
                    Approve Now
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button className="btn">Decline</button>
                </Table.Cell>
                <Table.Cell>
                  <button className="btn">Delete</button>
                </Table.Cell>
                <Table.Cell>
                  <button className="btn">Premium</button>
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
