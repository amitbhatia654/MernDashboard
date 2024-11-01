import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ErrorMessage, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { addEmployee } from "../../assets/FormSchema";
import axiosInstance from "../../ApiManager";

export default function CreateEmployeeData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({});

  const handleSubmit = async (values) => {
    setloading(true);
    const res = id
      ? await axiosInstance.put(`/api/employee/${id}`, values)
      : await axiosInstance.post(`/api/employee`, values);

    setloading(false);
    if (res.status == 200) {
      toast.success(res.data);
      navigate("/employees");
    }
  };

  const getEmpById = async () => {
    const result = await axiosInstance.get(`/api/employee/${id}`);
    if (result) {
      setData(result.data);
    } else {
      setData({});
    }
  };

  useEffect(() => {
    if (id) getEmpById();
  }, []);
  return (
    <>
      <Formik
        initialValues={
          id
            ? data
            : {
                empName: "",
                empEmail: "",
                empPhone: "",
                empDepartment: "",
                empAddress: "",
              }
        }
        validationSchema={addEmployee}
        enableReinitialize={true}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div
              className="m-3 p-2 mt-4"
              style={{
                boxShadow: "0px 3px 9px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Button
                variant="outlined"
                type="button"
                sx={{
                  color: "#47478c",
                  backgroundColor: "white",
                  fontSize: "14px",
                }}
                onClick={() => navigate("/employees")}
              >
                <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              </Button>
              <div className="d-flex justify-content-center ">
                <h2 className="text-decoration-underline">
                  {id ? "Edit" : "Add"} Employee Details
                </h2>
              </div>
              <div className="container p-3">
                <div className="row">
                  <div className="col-md-4 ">
                    <TextField
                      name="empName"
                      id="outlined-basic"
                      size="small"
                      label={props.values.empName ? "" : "Name"}
                      fullWidth={true}
                      placeholder="enter name"
                      value={props.values.empName}
                      onChange={props.handleChange}
                      variant="outlined"
                      sx={{ m: 1 }}
                    />
                    <ErrorMessage
                      name="empName"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="col-md-4">
                    <TextField
                      name="empEmail"
                      size="small"
                      fullWidth={true}
                      id="outlined-basic"
                      value={props.values.empEmail}
                      label={props.values.empEmail ? "" : "Email"}
                      placeholder="enter email"
                      type="email"
                      onChange={props.handleChange}
                      variant="outlined"
                      sx={{ m: 1 }}
                    />
                    <ErrorMessage
                      name="empEmail"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="col-md-4">
                    <TextField
                      name="empPhone"
                      id="outlined-basic"
                      size="small"
                      placeholder="enter phone number"
                      label={props.values.empPhone ? "" : "Phone Number"}
                      fullWidth={true}
                      type="number"
                      value={props.values.empPhone}
                      onChange={(e) => {
                        if (e.target.value.length <= 10) {
                          props.setFieldValue("empPhone", e.target.value);
                        }
                      }}
                      variant="outlined"
                      sx={{ m: 1 }}
                    />
                    <ErrorMessage
                      name="empPhone"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="col-md-4">
                    <TextField
                      name="empDepartment"
                      id="outlined-basic"
                      size="small"
                      label={props.values.empDepartment ? "" : "Department"}
                      fullWidth={true}
                      placeholder="enter department"
                      onChange={props.handleChange}
                      value={props.values.empDepartment}
                      variant="outlined"
                      sx={{ m: 1 }}
                    />
                    <ErrorMessage
                      name="empDepartment"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="col-md-4">
                    <TextField
                      name="empAddress"
                      id="outlined-basic"
                      size="small"
                      placeholder="enter address"
                      label={props.values.empAddress ? "" : "Address"}
                      fullWidth={true}
                      onChange={props.handleChange}
                      value={props.values.empAddress}
                      variant="outlined"
                      sx={{ m: 1, width: "100%" }}
                    />

                    <ErrorMessage
                      name="empAddress"
                      component={"div"}
                      className="text-danger"
                    ></ErrorMessage>
                  </div>

                  <div className="d-flex justify-content-center my-5">
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        my: 1,
                        color: "#47478c",
                        backgroundColor: "white",
                        fontSize: "16px",
                      }}
                      disabled={loading}
                      // onClick={() => navigate("/add-new-employee")}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
