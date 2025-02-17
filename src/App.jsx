import React from "react";
import LoginSignup from "./components/LoginSignup";
import DataProvider from "./components/context/dataProvider.jsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Full_Blog from "./pages/FullBlog";
import MyBlogs from "./pages/MyBlogs";
import UpdatePost from "./pages/UpdateBlog";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<LoginSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />} />
        <Route path="/update" element={<UpdatePost />}></Route>
        <Route path="/blog/:id" element={<Full_Blog />}></Route>
        <Route path="/myBlogs" element={<MyBlogs />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
