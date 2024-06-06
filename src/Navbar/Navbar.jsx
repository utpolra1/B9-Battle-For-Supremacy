import React, { useState, useEffect, useContext } from "react";
import {
  MobileNav,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { authContext } from "../Firebase/AuthProvider";
import UseAxiosSecure from "../Component/Axios/UseAxiosScoure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user, logout } = useContext(authContext);
  const axiosSecure = UseAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const hanlelogout = () => {
    logout()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    return () => {
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
  }, []);

  //find email login user backend
  const loggedInUser = users.find((u) => u.email === user?.email);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink to="/" className="btn-outline">
        Home
      </NavLink>
      <NavLink to="/addArticle" className="btn-outline">
        Add Article
      </NavLink>
      <NavLink to="/allArticle" className="btn-outline">
        All Article
      </NavLink>
      <NavLink to='/subscription' className="btn-outline">Subscription</NavLink>
      <NavLink className="btn-outline">Premium Artilce</NavLink>
      <NavLink to='/myarticle' className="btn-outline">My Article</NavLink>
      {loggedInUser?.role === "admin" && (
        <NavLink to="dashboard/allusers" className="btn-outline">
          Dashboard
        </NavLink>
      )}
    </ul>
  );

  return (
    <div className="mx-auto py-2 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900 bg-blue-gray-50 p-2">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <div>
            {user ? (
              <div>
                <div role="">
                  <div className="w-10 mr-2 rounded-full items-center flex justify-center">
                    <Tooltip content={user.displayName}>
                      <button className="avatar online">
                        <img alt="" src={user.photoURL} />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink to="/login">
                <button className="bg-blue-gray-500 w-20 h-10 rounded-lg">
                  Login
                </button>
              </NavLink>
            )}
          </div>
          <div>
            {user && (
              <div>
                <button className="bg-blue-gray-500 w-20 h-10 rounded-lg btn-active font-bold">
                  <a className="" onClick={hanlelogout}>
                    Logout
                  </a>
                </button>
              </div>
            )}
          </div>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto text-black">{navList}</div>
      </MobileNav>
    </div>
  );
};

export default Navbar;
