import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./Router/Router.jsx";
import Home from "./Component/Home/Home.jsx";
import AddArticle from "./Component/AddArticle/AddArticle.jsx";
import Login from "./User/Login.jsx";
import Register from "./User/Register.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Component/Dashboard/Dashboard.jsx";
import AllUsers from "./Component/Dashboard/Page/AllUsers.jsx";
import AllArticles from "./Component/Dashboard/Page/AllArticles.jsx";
import AddPublisher from "./Component/Dashboard/Page/AddPublisher.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyArticle from "./Component/MyArticle/MyArticle.jsx";
import AllArticle from "./Component/AllArticle/AllArticle.jsx";
import BlogDeatils from "./Component/Home/BlogDeatils.jsx";
import Subscription from "./Component/Subscription/Subscription.jsx";

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Router />,
    errorElement: <></>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "addArticle",
        element: <AddArticle />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:'/myarticle',
        element:<MyArticle></MyArticle>
      },
      {
        path:'/allArticle',
        element:<AllArticle></AllArticle>
      },
      {
        path: "/blogdetails/:_id",
        element:<BlogDeatils></BlogDeatils>
      },
      {
        path:'/subscription/:price',
        element:<Subscription></Subscription>
      }
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "allusers",
        element: <AllUsers />,
      },
      {
        path: "allarticles",
        element: <AllArticles />,
      },
      {
        path: "addpublisher",
        element: <AddPublisher />,
      },
    ],
  },
]);

// Create a QueryClient instance
const queryClient = new QueryClient();
// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
