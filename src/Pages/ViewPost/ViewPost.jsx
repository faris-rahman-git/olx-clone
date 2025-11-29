import React from "react";
import Header from "../../Components/Header/Header";
import View from "../../Components/View/View";
import { useParams } from "react-router-dom";

const ViewPost = () => {
  const { postId } = useParams();

  return (
    <div>
      <Header />
      <View postId={postId} />
    </div>
  );
};

export default ViewPost;
