import React, { useEffect, useState } from "react";
import ContainerPage from "../HelperPages/ContainerPage";
import Modal from "../HelperPages/Modal";
import axiosInstance from "../../ApiManager";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";

export default function Messages() {
  const user = useSelector((user) => user.cart);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [allchats, setAllChats] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/users", {
      //    params: { search, rowSize, currentPage },
    });
    if (res.status == 200) {
      setUsers(res.data.response);
      //    setTotalCount(res.data.totalCount);
    } else {
      setUsers([]);
      //    setTotalCount(0);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const res = await axiosInstance.post("/api/chat/newchat", {
      recieverId: newUser,
    });
  };

  const fetchAllChats = async () => {
    setLoading(true);
    const res = await axiosInstance.get("/api/chat/allChats");
    if (res.status == 200) {
      setAllChats(res.data.chats);
    } else {
      setAllChats([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchAllChats();
  }, []);
  return (
    <ContainerPage title={"messages"}>
      <div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          New Chat
        </button>
        <div className="container my-4 m-2">
          <div className="row">
            <div
              className="col-md-2 border border-primary"
              style={{ height: "400px" }}
            >
              {" "}
              <h4>All Chats</h4>
              {allchats.map((chat) => {
                return (
                  <h6>
                    {
                      chat.participants.filter((data) => data._id != user.id)[0]
                        .name
                    }
                  </h6>
                );
              })}
            </div>
            <div className="col-md-9 border mx-1 border-primary">
              <h4> message Box</h4>
            </div>
          </div>
        </div>

        {showModal && (
          <Modal
            setShowModal={setShowModal}
            title={" New chat"}
            handleSubmit={handleSubmit}
          >
            <p>Select User</p>
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={{ value: newUser }}
                onChange={(e) => {
                  setNewUser(e.target.value);
                }}
              >
                {users.map((user) => {
                  return <MenuItem value={user._id}>{user.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Modal>
        )}
      </div>
    </ContainerPage>
  );
}
