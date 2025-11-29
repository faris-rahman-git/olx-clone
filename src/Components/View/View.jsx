import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { LoadingContext } from "../../context/authContext";

const View = ({ postId }) => {
  const [post, setPost] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const [seller, setSeller] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "productDetails", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          const postData = { id: postSnap.id, ...postSnap.data() };
          setPost(postData);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const sellerDetails = async () => {
      try {
        const q = query(
          collection(db, "user"),
          where("uid", "==", post.userId)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const sellerData = { id: doc.id, ...doc.data() };
          setSeller(sellerData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    if (postId) {
      fetchPost();
    }
    if (post.userId) {
      sellerDetails();
    }
  }, [postId, post.userId, setLoading]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={post.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price} </p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{post.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{seller.name}</p>
          <p>{seller.phone}</p>
          <p>{seller.email}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
