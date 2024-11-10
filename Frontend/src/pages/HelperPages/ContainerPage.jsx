import { Button, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

export default function ContainerPage({
  children,
  showBackBtn = false,
  title,
  showBtn = false,
  btnTitle,
  setSearch,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-fluid   " style={{ padding: "0px" }}>
        <div className="row">
          <div className="col-md-3">
            {showBackBtn && (
              <button
                style={{ border: "0px", color: "#47478C" }}
                onClick={() => navigate(-1)}
              >
                <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
              </button>
            )}
            <span
              className="mx-1"
              style={{ fontSize: "22px", fontWeight: "bold", color: "#47478C" }}
            >
              {title}
            </span>
          </div>
          <div className="col-md-9 d-flex justify-content-end">
            <TextField
              type="text"
              sx={{ width: "220px" }}
              size="small"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="search"
            ></TextField>
            {showBtn && (
              <button
                style={{
                  color: "#47478c",
                  backgroundColor: "white",
                  fontSize: "16px",
                  border: "0px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  minHeight: "42px",
                  maxHeight: "42px",
                  marginTop: "6px",
                }}
              >
                {btnTitle}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <hr /> */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
