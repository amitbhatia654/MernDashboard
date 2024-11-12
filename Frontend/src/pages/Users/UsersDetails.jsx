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
    const res = await axiosInstance.get("/api/users", {
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
        showBackBtn={true}
        title={"ALL USERS"}
        btnTitle={"Add User"}
        showSearch={true}
        setSearch={setSearch}
        rowSize={rowSize}
        setRowSize={setRowSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      >
        <TableContainer
          className="scrollable-container "
          style={{
            maxHeight: "67vh",
            // minHeight: "67vh",
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
                <TableCell sx={{ color: "white" }}>Phone Number</TableCell>
                <TableCell sx={{ color: "white" }}>Joining Date</TableCell>
                {/* <TableCell sx={{ color: "white" }}>Action</TableCell> */}
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
                      {row?.name}
                    </TableCell>
                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.email}
                    </TableCell>

                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.phone}
                    </TableCell>

                    <TableCell
                      style={{ boxShadow: "0px 2px 4px rgba(0 ,0 ,0 ,0.2)" }}
                    >
                      {row?.createdAt?.split("T")[0]}
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
      </ContainerPage>
    </div>
  );
}
