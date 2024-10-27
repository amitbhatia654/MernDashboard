import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";

export default function Employee() {
  const [allemployee, setAllEmployee] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    // firebase.getAllPosts().then((data) => {
    //   setAllEmployee(data.docs);
    // });
  };

  const handleEdit = (id) => {
    navigate("/add-new-employee", { state: { id } });
  };

  const handleDelete = async (id) => {
    const res = await firebase.deletePost(id);
    if (res) {
      toast.success(res);
      setAllEmployee(allemployee.filter((data) => data.id != id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{ m: 2 }}
      boxShadow="0px 5px 8px rgba(0, 0, 0, 0.1)"
      //   borderRadius={8}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box component={"h2"} sx={{ my: 2 }}>
          All Employees{" "}
        </Box>

        <Button
          variant="outlined"
          sx={{ my: 2 }}
          onClick={() => navigate("/add-new-employee")}
        >
          Add Employee
        </Button>
      </Box>

      <TableContainer>
        <Table sx={{}} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "grey" }}>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allemployee.length >= 0 ? (
              allemployee?.map((row, index) => (
                <TableRow
                  key={row.data()?.empName}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.data().empName}</TableCell>
                  <TableCell>{row?.data().empEmail}</TableCell>
                  <TableCell>{row?.data().empPhone}</TableCell>
                  <TableCell>{row?.data().empDepartment}</TableCell>
                  <TableCell>{row?.data().empAddress}</TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={4}>
                        <button
                          type="button"
                          onClick={() => handleEdit(row.id)}
                        >
                          <BorderColorIcon />
                        </button>
                      </Grid>
                      <Grid item lg={4}>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          // style={{ backgroundColor: "grey" }}
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
                <TableCell
                  style={{
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  colSpan={12}
                >
                  {" "}
                  <div className="loader"></div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
