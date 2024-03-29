import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState();

  useEffect(() => {
    const getNewUsers = async () => {
      const res = await axios.get("users?new=true", {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmFjM2IwNDQ0MGQ4MWU0ODAxNzM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDIyMjI2OSwiZXhwIjoxNjQ0NjU0MjY5fQ.jqzH3DTSm8yno5PTwuagJRnLdVd8YZhxrBZNeYhFbF8",
        },
      });
      setNewUsers(res.data);
    };
    getNewUsers();
  }, []);
  console.log(newUsers);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {/* <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Kellar</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li> */}
        {newUsers && newUsers.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={user.profilePic || 'data:image/png;base64,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'}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">Software Engineer</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
