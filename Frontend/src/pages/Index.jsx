/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import SideNav from "../components/SideNav";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import user from "../images/dp.jpeg";
import toast from "react-hot-toast";
import { remove } from "../reduxStore/UserSlice";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.cart);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <div className="d-flex">
        <div
          style={{
            color: "#47478C",
            fontSize: "26px",
            fontWeight: "bold",
            margin: "7px",
            width: "195px",
          }}
        >
          DashBoard
        </div>

        <div className="d-flex justify-content-end w-100">
          <div className=" my-1 ">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div>

          <div className="">
            <Tooltip title="My Profile" placement="bottom-end">
              <IconButton onClick={handleOpenUserMenu}>
                <span className="fs-6 fw-bold text-dark">
                  {" "}
                  {userData?.name.split(" ")[0]?.toUpperCase() ?? "user"}
                </span>
                <Avatar alt="User Image" src={user} className="mx-2" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </Typography>
              </MenuItem>

              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={async () => {
                    navigate("/login");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    dispatch(remove());
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="d-flex ">
        <div
          className={!isOpen ? "sidenav-full" : "sidenav-small"}
          style={{ borderTop: "2px solid", borderRight: "2px solid" }}
        >
          <div className="d-flex justify-content-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                color: "blue",
                // backgroundColor: "white",
                border: "1px solid white",
                fontSize: "14x",
              }}
            >
              {isOpen ? (
                <MenuIcon fontSize="small" />
              ) : (
                <CloseIcon fontSize="small" />
              )}
            </button>
          </div>
          <SideNav isOpen={isOpen}></SideNav>
        </div>

        <div
          className="scrollable-container"
          style={{ width: "100%", borderTop: "2px solid" }}
        >
          <div
            className="scrollable-container box-shaddow-style"
            style={{
              minHeight: "83vh",
              maxHeight: "83vh",
              padding: "10px",
              margin: "10px",
            }}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div
        className=" border-primary "
        style={{
          boxShadow: "0px 1px 3px 2px rgba(0,0,0,0.2)",
          padding: "6px",
        }}
      >
        <h6 className="text-center text-primary">
          © 2024 | Custom Dashboard | All rights reserved
        </h6>
      </div>
    </>
  );
}
