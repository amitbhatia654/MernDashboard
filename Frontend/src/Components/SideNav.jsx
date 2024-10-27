import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PeopleIcon from "@mui/icons-material/People";
import GradingIcon from "@mui/icons-material/Grading";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
// import { useFirebase } from "../context/Firebase";

export default function SideNav({ isOpen }) {
  const location = useLocation();

  const routes = [
    { path: "employees", logo: <ContactEmergencyIcon /> },
    { path: "customers", logo: <PeopleIcon /> },
    { path: "orders", logo: <GradingIcon /> },
  ];
  return (
    <>
      <Box
        sx={{ mx: 1, my: 1 }}
        backgroundColor={`${location.pathname == "/" ? "grey" : ""}`}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
            fontSize: "17px",
            color: "black",
          }}
        >
          {/* {data?.logo} */}
          <WidgetsIcon />
          <Box
            component={"span"}
            sx={{ display: `${isOpen && "none"}`, mx: 1 }}
          >
            DASHBOARD
          </Box>
        </Link>
      </Box>
      {routes.map((data, index) => {
        return (
          <div key={index}>
            <Box
              sx={{ mx: 1, my: 2 }}
              index={index}
              backgroundColor={`${
                location.pathname.slice(1) == data.path ? "grey" : ""
              }`}
            >
              <Link
                to={data?.path}
                style={{
                  textDecoration: "none",
                  textTransform: "capitalize",
                  fontSize: "15px",
                  color: "black",
                }}
              >
                <span> {data?.logo}</span>
                <Box
                  component={"span"}
                  sx={{ display: `${isOpen && "none"}`, mx: 1, my: 1 }}
                >
                  {data?.path.toUpperCase()}
                </Box>
              </Link>
            </Box>
          </div>
        );
      })}
    </>
  );
}
