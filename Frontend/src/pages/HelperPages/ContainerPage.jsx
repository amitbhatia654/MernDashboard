import { TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

export default function ContainerPage({
  children,
  showBackBtn = false,
  title,
  btnTitle,
  setSearch,
  showSearch = false,
  rowSize,
  setRowSize,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-fluid" style={{ padding: "0px" }}>
        <div className="row">
          <div className="col-md-3 ">
            {showBackBtn && (
              <button
                style={{ border: "0px", color: "#47478C" }}
                onClick={() => navigate(-1)}
              >
                <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              </button>
            )}
            <span
              className="mx-4"
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                color: "#47478C",
              }}
            >
              {title}
            </span>
          </div>
          <div className="col-md-9 d-flex justify-content-end">
            {showSearch && (
              <TextField
                type="text"
                sx={{ width: "200px", m: 1 }}
                size="small"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="search"
              ></TextField>
            )}
            {btnTitle && <button className="common-btn">{btnTitle}</button>}
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          boxShadow: "0px 5px 8px rgba(0, 0, 0, 0.2)",
          minHeight: "76vh",
        }}
      >
        <div
          className="d-flex flex-column justify-content-between  "
          style={{ height: "76vh" }}
        >
          {children}

          <Pagination
            setRowSize={setRowSize}
            rowSize={rowSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
