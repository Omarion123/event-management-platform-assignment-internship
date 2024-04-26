import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Article from "../pages/Article";
// import Forgot from "../pages/Forgot";
// import DashLayout from "../layouts/DashLayout";
// import Dashboard from "../pages/dashboard/Dashboard";
// import Categories from "../pages/dashboard/Categories";
// import App from "../components/App";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeLayout />}/>
        <Route path="/single/:123" element={<Article />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="" element={<App />} /> */}
        {/* </Route> */}
        {/* <Route path="/forgot-password" element={<Forgot />} /> */}

        {/* --------------- Dashboard routes --------------- */}
        {/* <Route path="/dashboard" element={<DashLayout />}> */}
        {/* <Route index element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/category" element={<Categories />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
