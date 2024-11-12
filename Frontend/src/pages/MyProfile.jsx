import { Button } from "@mui/material";
import img from "../images/user.jpg";
import { useNavigate } from "react-router-dom";
import ContainerPage from "./HelperPages/ContainerPage";
import axiosInstance from "../ApiManager";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const MyProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const user = useSelector((state) => state.cart);
  const id = user.id || "";

  const getEmpById = async () => {
    const result = await axiosInstance.get(`/api/update-profile/${id}`);
    if (result) {
      setData(result.data);
      console.log(result.data, "dataa");
    } else {
      setData({});
    }
  };

  useEffect(() => {
    if (id) getEmpById();
  }, []);
  return (
    <>
      <ContainerPage title={"My Profile"}>
        <div className="container mt-4 p-4 ">
          <div className="row">
            <div
              className="col-md-3 px-4"
              style={{
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
                  <span className="fw-bold">Name :</span> {data?.name}{" "}
                </li>
                <li>
                  <span className="fw-bold">Email :</span> {data?.email}{" "}
                </li>
                <li>
                  <span className="fw-bold">Phone Number :</span> {data?.phone}{" "}
                </li>
                <li>
                  <span className="fw-bold">Department :</span>{" "}
                  {data?.department || "--"}{" "}
                </li>

                <li>
                  <span className="fw-bold">Address :</span>{" "}
                  {data?.address || "--"}{" "}
                </li>
                <li>
                  <Button
                    sx={{
                      my: 1,
                      color: "#47478c",
                      backgroundColor: "white",
                      fontSize: "13px",
                    }}
                    onClick={() =>
                      navigate("/update-profile", { state: { id: "123" } })
                    }
                  >
                    Edit
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ContainerPage>
    </>
  );
};

export default MyProfile;
