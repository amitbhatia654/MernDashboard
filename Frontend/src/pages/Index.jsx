/* eslint-disable no-unused-vars */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import SideNav from "../components/SideNav";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";

import user from "../images/dp.jpeg";
import toast from "react-hot-toast";

export default function Index() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        // width={"100%"}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            color: "#5301FF",
            fontSize: "26px",
            fontWeight: "bold",
            m: 2,
          }}
        >
          DashBoard{" "}
        </Box>
        {/* <div>
          <TextField
            // sx={{ width: "360px" }}
            variant="standard"
            placeholder="Search .."
          />
          <SearchIcon sx={{ fontSize: 22 }}></SearchIcon>{" "}
        </div> */}
        <div>
          <Box display={{ xs: "none", sm: "none", lg: "inline", md: "inline" }}>
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
            <MenuItem>
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
                  localStorage.setItem("token", "");
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
                fontSize: "16px",
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
