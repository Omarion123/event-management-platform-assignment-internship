import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Article from "../pages/Article";
import UserBookList from "../pages/UserBookList";
// import Forgot from "../pages/Forgot";
import DashLayout from "../layouts/DashLayout";
import DashboardEvents from "../components/DashboardEvents";
import DashboardBooking from "../components/DashboardBooking";
import DashboardUsers from "../components/DashboardUsers";
import DashboardMain from "../components/DashboardMain";

const AppRoutes = () => {

  const sessionToken = localStorage.getItem("sessionToken");
  const isLoggedIn = sessionToken !== null;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeLayout />} />
        <Route path="/single/:eventId" element={<Article />} />
        {/* <Route path="/single/:eventId" element={isLoggedIn ? <Article /> : <Navigate to="/login" replace />} /> */}
        {/* <Route path="/userlist" element={<UserBookList />} /> */}
        <Route path="/userlist" element={isLoggedIn ? <UserBookList /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<DashboardMain />} />
          <Route path="/dashboard/event" element={<DashboardEvents />} />  {/* Corrected path */}
          <Route path="/dashboard/booking" element={<DashboardBooking />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
        </Route>
        {/* <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<DashboardMain />} />
          <Route path="/dashboard/event" element={<DashboardEvents />} />
          <Route path="/dashboard/booking" element={<DashboardBooking />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
