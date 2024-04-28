import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Article from "../pages/Article";
import UserBookList from "../pages/UserBookList";
import DashLayout from "../layouts/DashLayout";
import DashboardEvents from "../components/DashboardEvents";
import DashboardBooking from "../components/DashboardBooking";
import DashboardUsers from "../components/DashboardUsers";
import DashboardMain from "../components/DashboardMain";
import { toast } from "react-toastify";

const AppRoutes = () => {
  const sessionToken = localStorage.getItem("sessionToken");
  const role = localStorage.getItem("role");
  const isLoggedIn = sessionToken !== null;

  // Use useEffect to show toast message only once when component mounts
  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("Please log in, to use the app to your best!");
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/single/:eventId" element={<Article />} />
        <Route
          path="/userlist"
          element={!isLoggedIn ? <Navigate to="/login" replace /> : <UserBookList />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={!isLoggedIn && !role==="admin" ? <Navigate to="/login" replace /> : <DashLayout />}
        >
          <Route index element={<DashboardMain />} />
          <Route path="/dashboard/event" element={<DashboardEvents />} />{" "}
          {/* Corrected path */}
          <Route path="/dashboard/booking" element={<DashboardBooking />} />
          <Route path="/dashboard/users" element={<DashboardUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
