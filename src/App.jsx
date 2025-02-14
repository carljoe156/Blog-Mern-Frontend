import React from "react";
import LoginSignup from "./components/LoginSignup";
import DataProvider from "./components/context/dataProvider.jsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<LoginSignup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
