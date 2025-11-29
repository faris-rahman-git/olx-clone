import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import Heart from "../../assets/Heart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/authContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getDocs(collection(db, "productDetails"));
        const postsList = posts.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePost = (id) => {
    setLoading(true);
    navigate(`/view/${id}`);
    setLoading(false);
  };

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {posts.map((post) => (
            <div
              className="card"
              onClick={() => handlePost(post.id)}
              key={post.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {post.price}</p>
                <span className="kilometer">{post.category}</span>
                <p className="name"> {post.name}</p>
              </div>
              {/* <div className="date">
                <span>
                  {() => {
                    const date = new Date(post.createdAt.seconds * 1000);
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    return date.toLocaleDateString('en-US', options);
                  }}
                </span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
