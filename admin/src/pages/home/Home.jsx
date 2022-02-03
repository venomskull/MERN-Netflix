import React, { useMemo } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { userData } from "../../dummyData";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmFjM2IwNDQ0MGQ4MWU0ODAxNzM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzQxNTUyNSwiZXhwIjoxNjQzODQ3NTI1fQ.WiWOZ39sgXX3e-9jXCEdka-tc0tp-mfn65R15AnGuAc",
          },
        });

        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) => {
          return setUserStats((prev) => [
            ...prev,
            { name: months[item._id - 1], "Active User": item.total },
          ]);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [months]);
    console.log(userStats);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        // data={userData}
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
