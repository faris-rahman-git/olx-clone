import React, { useContext, useState } from "react";
import Logo from "/Images/olx-logo.png";
import "./Signup.css";
import { signup } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/authContext";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signup(userName, email, password, number);
      if (res) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            id="lname"
            placeholder="Enter your phone number"
            name="phone"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSubmit} type="submit">
            Signup
          </button>
        </form>
        <a
          onClick={() => {
            setLoading(true);
            navigate("/login");
            setLoading(false);
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
