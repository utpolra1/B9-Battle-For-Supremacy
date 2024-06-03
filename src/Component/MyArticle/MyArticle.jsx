import React, { useContext } from "react";
import { Table } from "flowbite-react";
import UseAxiosSecure from "../Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "../../Firebase/AuthProvider";
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
                <Table.Cell>{data.title}</Table.Cell>
                <Table.Cell>{data.status}</Table.Cell>
                <Table.Cell>{data.isPremium ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>
                  <button className="btn">View</button>
                </Table.Cell>
                <Table.Cell>
                  <button className="btn">Update</button>
                </Table.Cell>
                <Table.Cell>
                  <button className="btn">Delete</button>
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
