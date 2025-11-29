import React, { useContext } from "react";
import "./Loading.css";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import { LoadingContext } from "../../context/authContext";

const Loading = () => {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="loading-container">
      <div className="loading">
        <TailChase size="40" speed="1.75" color="black" />
      </div>
    </div>
  );
};

export default Loading;
