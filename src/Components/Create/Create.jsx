import React, { useContext, useState } from "react";
import "./Create.css";
import { LoadingContext, UserContext } from "../../context/authContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const {setLoading} = useContext(LoadingContext);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image && name && category && price > 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "olx-product-image");
      formData.append("cloud_name", "dvr382ysh");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvr382ysh/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadedImage = await res.json();
      const imageUrl = uploadedImage.url;
      await addDoc(collection(db, "productDetails"), {
        userId: user.uid,
        name,
        category,
        price,
        url: imageUrl,
        createdAt: new Date().toISOString(),
      });
      navigate("/");
      setLoading(false);
      toast.success("Product added successfully");
    } else {
      toast.error("Please fill all the fields and upload an image");
    }
  };

  return (
    <>
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Product name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Product category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="fname"
              name="Price"
            />
            <br />
          </form>
          <br />
          <img
            className="imgPrev"
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <form>
            <br />
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>
              upload and Submit
            </button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
