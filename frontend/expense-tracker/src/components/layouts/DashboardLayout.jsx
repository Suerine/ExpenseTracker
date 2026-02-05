import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>

        <div className="grow mx-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
