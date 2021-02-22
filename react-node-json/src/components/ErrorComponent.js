import React from "react";

const ErrorComponent = (props) => {
  const {isError} = props;
  if(!isError) return null;
  return <div style={{textAlign: "center", fontSize: "16px"}}><h2>Error of reading or writing file on server</h2></div>
}

export default ErrorComponent;