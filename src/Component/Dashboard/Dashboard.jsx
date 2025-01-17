import React from "react";
import { FaHome, FaRedRiver, FaShoppingCart, FaStreetView, FaUser, FaUserPlus } from "react-icons/fa";
import { FaBookBookmark, FaChartSimple, FaUsersViewfinder } from "react-icons/fa6";
import { MdArticle, MdOutlinePublishedWithChanges } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-blue-500">
        <ul className="menu pb-4">
          <li>
            <NavLink className='flex items-center gap-2 text-center' to="/dashboard/allusers"><FaUserPlus/>All users</NavLink>
          </li>
          <li><NavLink className='flex items-center gap-2 text-center' to='/dashboard/allarticles'><MdArticle/> All Articles</NavLink></li>
          <li>
            <NavLink className='flex items-center gap-2 text-center' to="/dashboard/addpublisher"><MdOutlinePublishedWithChanges />Add Publisher</NavLink>
          </li>
          <li>
            <NavLink className='flex items-center gap-2 text-center' to="/dashboard/admindashboard"><FaChartSimple/>Charts</NavLink>
          </li>
          <div className="divider">
          </div>
          <NavLink className='flex gap-2 text-center items-center' to='/'><FaHome></FaHome> Home</NavLink>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;