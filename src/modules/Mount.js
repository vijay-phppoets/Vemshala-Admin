import React from "react";

const Mount = ({ children, condition }) => {
  
  const errorMessage = (message) => console.error(message);

  try {

    if (condition === undefined) throw new Error("Condition argument is required")

    if (typeof condition !== 'boolean') throw new Error("The condition argument should true|false")

    if(condition === true) return <React.Fragment>{children}</React.Fragment>

  } catch (error) { errorMessage(error.message) }

  return <React.Fragment></React.Fragment>;
};

export default Mount