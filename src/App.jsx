import React from "react";
import LoginSignup from "./components/LoginSignup";
import DataProvider from "./components/context/dataProvider.jsx";
import { Routes, Route } from "react-router";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<LoginSignup />}></Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
