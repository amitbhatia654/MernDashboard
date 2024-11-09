import { Button } from "@mui/material";
import img from "../images/user.jpg";
const MyProfile = () => {
  return (
    <>
      <h2 className="text-center">My Profile</h2>
      <div
        className="container mt-4 p-4 "
        style={{ boxShadow: " 2px 1px 5px grey", height: "500px" }}
      >
        <div className="row">
          <div
            className="col-md-3 px-4"
            style={{
              // boxShadow: " inset 2px 1px 10px grey",
              padding: "5px",
              borderRadius: "15px",
              height: "250px",
            }}
          >
            <img
              src={img}
              alt=""
              height={"100%"}
              width={"100%"}
              style={{
                borderRadius: "15px",
                // boxShadow: " 2px 1px 10px grey",
              }}
            />
          </div>
          <div
            className="col-md-9 px-4"
            // style={{ boxShadow: " 2px 1px 10px grey" }}
          >
            <ul className="list-unstyled fs-5 py-2">
              <li>
                {" "}
                <span className="fw-bold">Name :</span> Amit Bhatia{" "}
              </li>
              <li>
                <span className="fw-bold">Email :</span> amitbhatia654@gamil.com{" "}
              </li>
              <li>
                <span className="fw-bold">Phone Number :</span> 8726773631{" "}
              </li>
              <li>
                <span className="fw-bold">Address :</span> Kanpur{" "}
              </li>
              <li>
                <Button
                  sx={{
                    my: 1,
                    color: "#47478c",
                    backgroundColor: "white",
                    fontSize: "13px",
                  }}
                >
                  Edit
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
