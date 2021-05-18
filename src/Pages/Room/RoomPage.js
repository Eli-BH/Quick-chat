import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { format } from "timeago.js";

import io from "socket.io-client";
import "./room.scss";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import axios from "axios";
import Card from "react-bootstrap/Card";

const RoomPage = () => {
  const [messageList, setMessageList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const user = localStorage.getItem("userToken");

  const roomName = useParams().room.trim();

  const CONNECTION_PORT = "quickchat-apiserver.herokuapp.com";
  const socket = useRef();
  const message = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://quickchat-apiserver.herokuapp.com/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          }
        );
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    socket.current = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.current.emit("joinRoom", roomName.trim());
  }, [roomName]);

  useEffect(() => {
    socket.current.on("receiveMessage", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://quickchat-apiserver.herokuapp.com/api/room/messages/${roomName}`
        );

        setMessageList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [roomName]);

  const sendMessage = async () => {
    const newMessage = {
      room: roomName,

      content: {
        text: message.current.value,
        time: Date.now(),
        author: currentUser.username,
      },
    };

    message.current.value = "";

    try {
      setMessageList([
        ...messageList,
        {
          text: newMessage.content.text,
          author: currentUser.username,
          time: Date.now(),
        },
      ]);
      await socket.current.emit("sendMessage", newMessage);

      await axios.post(
        "https://quickchat-apiserver.herokuapp.com/api/room/new_message",
        {
          roomName: roomName,
          text: newMessage.content.text,
          author: currentUser.username,
        }
      );
    } catch (error) {
      console.log(error);
    }

    await clear();
  };

  const clear = () => (message.current.value = "");

  return (
    <div className="roomPage">
      {" "}
      <div className="escapeBtns">
        <Link to="/">
          <Button variant="success">Back to room select</Button>
        </Link>
      </div>
      <h1 className="heading">Welcome to the {roomName} room!</h1>
      <div className="roomPageWrapper">
        <div className="messages">
          {messageList.map((val, index) => {
            return (
              <div className="messageContainer" key={index} ref={scrollRef}>
                <Card
                  border="primary"
                  style={{ padding: 10 }}
                  className={
                    currentUser.username === val.author
                      ? "chatCardSelf"
                      : "chatCard"
                  }
                >
                  <Card.Body>{val.text}</Card.Body>{" "}
                  <footer>
                    <small>{val.author} - </small>
                    <small>{format(val.time)}</small>
                  </footer>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="messageInputs">
          <InputGroup className="mb-0  inputs">
            <FormControl
              placeholder="Send message"
              aria-label="Message Input"
              ref={message}
            />
            <InputGroup.Append>
              <Button
                className="sendBtn"
                variant="outline-secondary"
                onClick={sendMessage}
              >
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
