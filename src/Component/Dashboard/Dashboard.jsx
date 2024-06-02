import React from "react";
import { FaHome, FaRedRiver, FaShoppingCart, FaStreetView, FaUser } from "react-icons/fa";
import { FaBookBookmark, FaUsersViewfinder } from "react-icons/fa6";
import { MdArticle, MdOutlinePublishedWithChanges } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu pb-4">
          <li>
            <NavLink className='flex items-center gap-2 text-center' to="/dashboard/allusers"><FaUser/>All users</NavLink>
          </li>
          <li><NavLink className='flex items-center gap-2 text-center' to='/dashboard/allarticles'><MdArticle/> All Articles</NavLink></li>
          <li>
            <NavLink className='flex items-center gap-2 text-center' to="/dashboard/addpublisher"><MdOutlinePublishedWithChanges />Add Publisher</NavLink>
          </li>
          <div className="divider"></div> 
        </ul>
        
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;