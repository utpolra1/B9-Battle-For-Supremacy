import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../Axios/UseAxiosScoure";

const AdminDashboard = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: blogs = [], refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    },
  });

  const publicationData = useMemo(() => {
    const publicationCounts = blogs.reduce((acc, blog) => {
      acc[blog.publisher] = (acc[blog.publisher] || 0) + 1;
      return acc;
    }, {});

    const totalArticles = Object.values(publicationCounts).reduce((acc, count) => acc + count, 0);

    const data = [["Publisher", "Articles"]];
    for (const [publisher, count] of Object.entries(publicationCounts)) {
      const percentage = (count / totalArticles) * 100;
      data.push([publisher, percentage]);
    }
    return data;
  }, [blogs]);

  const pieChartOptions = {
    title: "Publication Articles Distribution",
    pieHole: 0.4,
  };

  const barChartData = [
    ["Year", "Sales", "Expenses"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
  ];

  const barChartOptions = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales and Expenses: 2014-2017",
    },
  };

  const lineChartData = [
    ["x", "dogs", "cats"],
    [0, 0, 0],
    [1, 10, 5],
    [2, 23, 15],
    [3, 17, 9],
    [4, 18, 10],
    [5, 9, 5],
    [6, 11, 3],
    [7, 27, 19],
  ];

  const lineChartOptions = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Popularity",
    },
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "45%" }}>
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={publicationData}
            options={pieChartOptions}
          />
        </div>
        <div style={{ width: "45%" }}>
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={barChartData}
            options={barChartOptions}
          />
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "50px" }}>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={lineChartData}
          options={lineChartOptions}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
