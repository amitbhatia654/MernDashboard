import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
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
  const [search, setSearch] = useState("");
  const [rowSize, setRowSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / rowSize);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/employee", {
      params: { search, rowSize, currentPage },
    });
    if (res.status == 200) {
      setAllEmployee(res.data.response);
      setTotalCount(res.data.totalCount);
    } else {
      setAllEmployee([]);
      setTotalCount(0);
    }
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
  }, [search, rowSize, currentPage]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box component={"h4"} sx={{ my: 0, color: "#47478C" }}>
          All EMPLOYEES{" "}
        </Box>

        <div>
          <TextField
            type="text"
            sx={{ m: 1 }}
            size="small"
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value), setCurrentPage(1);
            }}
          ></TextField>
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
        </div>
      </Box>

      <TableContainer
        className="scrollable-container"
        style={{ maxHeight: "62vh" }}
      >
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
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {(currentPage - 1) * rowSize + index + 1}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {row?.empName}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {row?.empEmail}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {row?.empPhone}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {row?.empDepartment}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    {row?.empAddress}
                  </TableCell>
                  <TableCell
                    style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                  >
                    <Grid container>
                      <Grid item lg={4}>
                        <button
                          type="button"
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            marginLeft: "2px",
                          }}
                          onClick={() => handleEdit(row._id)}
                        >
                          <BorderColorIcon />
                        </button>
                      </Grid>
                      <Grid item lg={4}>
                        <button
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            marginLeft: "2px",
                          }}
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

      <div className="d-flex justify-content-center mt-2 ">
        <span className="m-3">Rows Per Page</span>
        <TextField
          select
          value={rowSize}
          onChange={(e) => setRowSize(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mt: 1, mx: 2 }}
        >
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="12">12</MenuItem>
          <MenuItem value="18">18</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          sx={{
            my: 1,
            color: "blue",
            backgroundColor: "white",
            fontSize: "13px",
          }}
          disabled={currentPage === 1}
        >
          {"< prev"}
        </Button>

        <span className="m-3">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outlined"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          sx={{
            my: 1,
            color: "blue",
            backgroundColor: "white",
            fontSize: "13px",
          }}
          disabled={currentPage === totalPages}
        >
          {"Next >"}
        </Button>
      </div>
    </Box>
  );
}
