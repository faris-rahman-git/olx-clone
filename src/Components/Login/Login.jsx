import React, { useContext, useState } from "react";
import Logo from "/Images/olx-logo.png";
import "./Login.css";
import { login } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <br />
          <br />
          <button onClick={handleSubmit} type="submit">
            Login
          </button>
        </form>
        <a
          onClick={() => {
            setLoading(true);
            navigate("/signup");
            setLoading(false);
          }}
        >
          Signup
        </a>
      </div>
    </div>
  );
};

export default Login;
