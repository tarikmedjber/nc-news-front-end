import React from "react";

const Error = ({ err }) => {
  if (!err) return <h2>Something went wrong...</h2>;
  return (
    <div>
      <h2 className="Error">
        {err.errStatus} {err.errMessage}
      </h2>
    </div>
  );
};

export default Error;
