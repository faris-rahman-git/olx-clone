import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./Pages/SignupPage/SignupPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { LoadingContext, UserContext } from "./context/authContext";
import CreatePage from "./Pages/CreatePage/CreatePage";
import Loading from "./Components/Loading/Loading";
import ViewPost from "./Pages/ViewPost/ViewPost";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, "user"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      user();
    };
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <Loading />
          <ToastContainer theme="dark" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={!user ? <SignupPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/create"
              element={user ? <CreatePage /> : <Navigate to="/login" replace />}
            />
            <Route path="/view/:postId" element={<ViewPost />} />
          </Routes>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
