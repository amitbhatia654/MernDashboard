import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";
import axiosInstance from "../../ApiManager";
import noResult from "../../images/no-results3.jpeg";

export default function Employee() {
  const [allemployee, setAllEmployee] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/employee");
    if (res.status == 200) setAllEmployee(res.data);
    setLoading(false);
  };

  const handleEdit = (id) => {
    navigate("/add-new-employee", { state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/api/employee/${id}`);
    if (res.status == 200) {
      toast.success(res.data.message);
      setAllEmployee(allemployee.filter((data) => data._id != id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ m: 1, p: 2 }} boxShadow="0px 5px 8px rgba(0, 0, 0, 0.1)">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box component={"h2"} sx={{ my: 0 }}>
          EMPLOYEES{" "}
        </Box>

        <Button
          variant="outlined"
          sx={{
            my: 1,
            color: "#47478c",
            backgroundColor: "white",
            fontSize: "16px",
          }}
          onClick={() => navigate("/add-new-employee")}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer className="scrollable-container">
        <Table sx={{}} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#47478c",
              color: "wheat",
              position: "sticky",
              top: 0,
            }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }}>S.No.</TableCell>
              <TableCell sx={{ color: "white" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Department</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableCell colSpan={8}>
                {" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "300px",
                    textAlign: "center",
                  }}
                >
                  <div className="loader"></div>
                </div>
              </TableCell>
            ) : allemployee.length > 0 ? (
              allemployee?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row?.empName}</TableCell>
                  <TableCell>{row?.empEmail}</TableCell>
                  <TableCell>{row?.empPhone}</TableCell>
                  <TableCell>{row?.empDepartment}</TableCell>
                  <TableCell>{row?.empAddress}</TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={4}>
                        <button
                          type="button"
                          style={{ color: "#47478c", cursor: "pointer" }}
                          onClick={() => handleEdit(row._id)}
                        >
                          <BorderColorIcon />
                        </button>
                      </Grid>
                      <Grid item lg={4}>
                        <button
                          style={{ color: "#47478c", cursor: "pointer" }}
                          type="button"
                          onClick={() => handleDelete(row._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={noResult}
                      alt="No Result Image"
                      height="250px"
                      width="300px"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
