import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

import "./chatMenu.scss";
import axios from "axios";
import Toastify from "toastify-js";
import Button from "react-bootstrap/esm/Button";

const ChatMenuPage = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const roomName = useRef();
  const history = useHistory();
  const newRoomName = useRef();
  const dispatch = useDispatch();

  const enterRoom = (e) => {
    e.preventDefault();
    history.push(`/room/${room} `);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          "https://quickchat-apiserver.herokuapp.com/api/room"
        );

        setRooms(res.data);
        setRoom(res.data[0].name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  const addNewRoom = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://quickchat-apiserver.herokuapp.com/api/room/newroom",
        {
          roomName: newRoomName.current.value,
        }
      );
      newRoomName.current.value = "";

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    Toastify({
      text: "New room created",
      duration: 3000,
    }).showToast();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="chatMenu">
      <Button
        className="logoutBtn"
        variant="danger"
        size="lg"
        onClick={handleLogout}
      >
        Logout
      </Button>

      <div className="chatMenuWrapper">
        <h3 className="chatHeader">Select a room</h3>

        <div className="chatRoomSelection">
          <label for="comic">Choose a brand: </label>

          <select
            id="comic"
            ref={roomName}
            onChange={(e) => setRoom(e.target.value)}
          >
            {rooms &&
              rooms.map((room) => (
                <option
                  value={room.name}
                  className="option"
                  style={{ textTransform: "capitalize" }}
                  key={room._id}
                >
                  {room.name}
                </option>
              ))}
          </select>

          <button className="roomBtn" onClick={enterRoom}>
            Enter Room
          </button>
        </div>

        <div className="chatRoomAddition">
          <form className="chatRoomForm" onSubmit={addNewRoom}>
            <label htmlFor="roomAdd"> Add a room: </label>
            <input
              id="roomAdd"
              type="text"
              placeholder="Room name"
              className="chatRoomInput"
              ref={newRoomName}
            />
            <button type="submit" className="addBtn">
              Add Room{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatMenuPage;
