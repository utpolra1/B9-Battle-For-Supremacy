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
import PremiumArtilce from "./Component/PremiumArticle/PremiumArtilce.jsx";
import UpdateArticle from "./Component/MyArticle/UpdateArticle.jsx";
import PrivetRoute from "./Component/PrivateRoute/PrivateRoute.jsx";
import { GiPrivate } from "react-icons/gi";
import SubscribePremium from "./Component/PrivateRoute/SubCribePremium.jsx";
import UserProfile from "./User/UserProfile.jsx";
import PrivateAdmin from "./Component/PrivateRoute/PrivateAdmin.jsx";
import AdminDashboard from "./Component/Dashboard/AdminDashboard.jsx";

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
        element: <PrivetRoute>
          <AddArticle/>
        </PrivetRoute>,
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
        element:<PrivetRoute>
          <MyArticle></MyArticle>
        </PrivetRoute>
      },
      {
        path:'/allArticle',
        element:<AllArticle></AllArticle>
      },
      {
        path: "/blogdetails/:_id",
        element:<PrivetRoute>
          <BlogDeatils></BlogDeatils>
        </PrivetRoute>
      },
      {
        path:'/subscription/:price',
        element:<PrivetRoute>
          <Subscription></Subscription>
        </PrivetRoute>
      },
      {
        path:'/premiumartilce',
        element:<PrivetRoute>
          <SubscribePremium>
          <PremiumArtilce></PremiumArtilce>
          </SubscribePremium>
        </PrivetRoute>
      },
      {
        path:"/updateBlog/:id",
        element:<UpdateArticle></UpdateArticle>
      },
      {
        path:'/userprofile',
        element:<UserProfile></UserProfile>
      }
    ],
  },
  {
    path: "dashboard",
    element: <PrivateAdmin><Dashboard></Dashboard></PrivateAdmin>,
    children: [
      {
        path:"admindashboard",
        element:<AdminDashboard></AdminDashboard>
      },
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
