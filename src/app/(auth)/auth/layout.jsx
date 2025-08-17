import React from "react";

function layout({ children }) {
  return (
    <div className="h-[100vh] flex justify-center items-center">{children}</div>
  );
}

export default layout;
