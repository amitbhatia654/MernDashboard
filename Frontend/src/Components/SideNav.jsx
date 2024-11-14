import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import PeopleIcon from "@mui/icons-material/People";
import GradingIcon from "@mui/icons-material/Grading";
import { useSelector } from "react-redux";
// import { useFirebase } from "../context/Firebase";

export default function SideNav({ isOpen }) {
  const location = useLocation();
  const user = useSelector((state) => state.cart);

  const routes = [
    { path: "Users", logo: <ContactEmergencyIcon />, isAdmin: false },
    { path: "employees", logo: <ContactEmergencyIcon />, isAdmin: true },
    { path: "customers", logo: <PeopleIcon />, isAdmin: true },
    { path: "orders", logo: <GradingIcon />, isAdmin: true },
    { path: "settings", logo: <GradingIcon />, isAdmin: true },
  ];
  return (
    <>
      <Box
        sx={{
          mx: 1,
          my: 1,
          p: 1,
          boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
        }}
        // backgroundColor={`${location.pathname == "/" ? "#4eaefc" : ""}`}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
            fontSize: "16px",
            color: `${location.pathname == "/" ? "blue" : "black"}`,
          }}
        >
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
        // if (user.isAdmin == true || (user.isAdmin == false && data.isAdmin))
        return (
          <div key={index} className="menu-items">
            <Box
              sx={{
                mx: 1,
                my: 1,
                p: 1,
                boxShadow: "0px 8px 18px rgba(0, 0, 0, 0.3)",
                borderRadius: "8px",
              }}
              index={index}
            >
              <Link
                to={data?.path}
                style={{
                  textDecoration: "none",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  color: `${
                    location.pathname.slice(1) == data.path ? "blue" : "black"
                  }`,
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
