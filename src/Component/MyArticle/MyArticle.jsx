import React from "react";
import { Table } from "flowbite-react";
const MyArticle = () => {
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
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                1
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>Laptop</Table.Cell>
              <Table.Cell>padding</Table.Cell>
              <Table.Cell><button className="btn">View</button></Table.Cell>
              <Table.Cell><button className="btn">Update</button></Table.Cell>
              <Table.Cell>
                <button className="btn">Delete</button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MyArticle;
