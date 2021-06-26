import React, { memo, useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { useHistory } from "react-router-dom";
import { getBreadcrumbs } from "../../../routes/utils";
import "./index.less";

const BreadCrumb = () => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const history = useHistory();
  const baseBread = {
    path: "/dashboard",
    meta: {
      title: "首页",
    },
  };

  useEffect(() => {
    if (history.location.pathname === "/dashboard") {
      setBreadcrumbs([...getBreadcrumbs(history.location.pathname)]);
    } else {
      setBreadcrumbs([
        baseBread,
        ...getBreadcrumbs(history.location.pathname),
      ]);
    }
    const unListen = history.listen(() => {
      if (history.location.pathname === "/dashboard") {
        setBreadcrumbs([...getBreadcrumbs(history.location.pathname)]);
      } else {
        setBreadcrumbs([
          baseBread,
          ...getBreadcrumbs(history.location.pathname),
        ]);
      }
    });
    return () => {
      unListen();
    };
  }, []);
  return (
    <div className="Breadcrumb-container">
      <Breadcrumb>
        {breadcrumbs.map((route) => (
          <Breadcrumb.Item key={route.path}>{route.meta.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default memo(BreadCrumb);
