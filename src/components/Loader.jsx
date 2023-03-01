import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div>
      <div className="loader">
        <Spin />
      </div>
    </div>
  );
};

export default Loader;
