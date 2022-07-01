import React from "react";

const Map = ({ children, iteration }) => {

  const errorMessage = (message) => console.error(message)

  try {

    if (iteration === undefined) throw new Error("Iteration argument is required")

    if (Array.isArray(iteration) === false) throw new Error("The iteration argument should be an array")

    if(iteration.length === 0) throw new Error("The iteration argument is an empty array")

    return iteration.map((data, idx) => {

      const childrenModification = {
          ...children,
          props: {
            ...children.props,
            data
          }
        };

      return <React.Fragment key={idx}>{childrenModification}</React.Fragment>;
    });
    
  } catch (error) { errorMessage(error.message) }

  return (<React.Fragment></React.Fragment>);
};

export default Map;
