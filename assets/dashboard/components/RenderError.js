import React from "react";

const RenderError = ({message}) => (
  <div className="alert alert-danger" role="alert">
    {message}
  </div>
);

export default RenderError;
