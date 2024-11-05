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
      <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
        <Box
          sx={{
            color: "#47478C",
            fontSize: "26px",
            fontWeight: "bold",
            m: 1,
          }}
        >
          DashBoard{" "}
        </Box>

        <div>
          <Box
            display={{ xs: "inline", sm: "inline", lg: "inline", md: "inline" }}
          >
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
          </Box>
          <span
            className="fs-6 p-2 "
            style={{ boxShadow: "0px 1px 3px 2px rgba(0,0,0,0.2)" }}
          >
            {" "}
            Welcome😊{" "}
            <span className="fw-bold " style={{ color: "#47478C" }}>
              {userData?.name?.toUpperCase() ?? "user"}
            </span>
          </span>

          <Tooltip title="My Profile" placement="left-end">
            <IconButton onClick={handleOpenUserMenu} sx={{ mx: 2 }}>
              <Avatar alt="Aemy Sharp" src={user} />
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
      </Box>

      <div className="main-div ">
        <Box
          className={!isOpen ? "sidenav-full" : "sidenav-small"}
          sx={{ borderTop: 2, borderRight: 2 }}
        >
          {" "}
          <SideNav isOpen={isOpen}></SideNav>
        </Box>
        <Box className="homepage " sx={{ borderTop: 2 }}>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                color: "blue",
                // backgroundColor: "white",
                border: "1px solid white",
                fontSize: "18px",
              }}
            >
              {isOpen ? (
                <MenuIcon fontSize="small" />
              ) : (
                <CloseIcon fontSize="small" />
              )}
            </button>
          </Grid>
          <div className="">
            <Outlet></Outlet>
          </div>
        </Box>
      </div>
    </>
  );
}
