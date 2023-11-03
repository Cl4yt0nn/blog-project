import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage.jsx";
import './Homepage.css';
import './SignIn.css';
import './CreatePost.css';
import CreatePost from './components/CreatePost.jsx';
import BlogDisplay from './components/BlogDisplay.jsx';

function App() {

  const acc = localStorage.getItem("accLoggedInto");

  return (
    <>
      <header>

        <Link to={"/display-post"}>
          <div className="img"></div>
        </Link>
        <div className="right">
          <Link to={"/create-post"} className="nav">
            Create Post
          </Link>
          <Link to={"/display-post"} className="nav">
            Home
          </Link>
          <Link to={"/signin"} className="nav">
            {(acc != 'undefined')? `Log Out: ${JSON.parse(localStorage.getItem("accLoggedInto")).username}` : 'Sign In'}
          </Link>
        </div>
      </header>
      <div className="body">
      </div>
      <footer></footer>
      <div className="links">

      </div>

      <Routes>
        <Route exact path="/create-post" element={<CreatePost />} />
        <Route exact path="/view/:id" element={<BlogDisplay />} />
        <Route exact path="/display-post" element={<HomePage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
