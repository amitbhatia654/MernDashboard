import {
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import ContainerPage from "../HelperPages/ContainerPage";
import { useEffect, useState } from "react";
import axiosInstance from "../../ApiManager";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import toast from "react-hot-toast";
import noResult from "../../images/no-results3.jpeg";

export default function UsersDetails() {
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
    <div>
      <ContainerPage
        showBackBtn={false}
        title={"ALL USERS"}
        // showBtn="true"
        // btnTitle={"Add User"}
        setSearch={setSearch}
      >
        <TableContainer
          className="scrollable-container "
          style={{
            maxHeight: "62vh",
            boxShadow: "3px 6px 8px grey",
          }}
        >
          <Table aria-label="simple table">
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
                <TableCell sx={{ color: "white" }}>User Name</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Joining Date</TableCell>
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
                      {row?.empAddress}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      <div className="d-flex ">
                        <button
                          type="button"
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            margin: "1px",
                          }}
                          onClick={() => handleEdit(row._id)}
                        >
                          <BorderColorIcon />
                        </button>

                        <button
                          style={{
                            color: "#47478c",
                            cursor: "pointer",
                            border: "1px solid white",
                            margin: "1px",
                          }}
                          type="button"
                          onClick={() => handleDelete(row._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
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

        <div className="d-flex justify-content-center mt-3 ">
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
      </ContainerPage>
    </div>
  );
}
