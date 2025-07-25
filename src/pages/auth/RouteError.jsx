import React from "react";

const RouteError = ({ error }) => {
  return (
    <>
      <div className="p-4 text-error flex flex-col">
        <h2>Something went wrong!</h2>
        <pre className="whitespace-pre-wrap break-words text-wrap">
          {error?.message}
        </pre>
      </div>
    </>
  );
};

const Fallback = () => <div className="p-4">Loading...</div>;

export { RouteError, Fallback };
