import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";

import './message.css';
import React, { useEffect, useRef, useState } from "react";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchUser from "../../components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { TroubleshootSharp } from "@mui/icons-material";
import { uploadToCloudnary } from "../../Utils/UploadToCloudniry";
import SockJS from "sockjs-client";
import Stom from "stompjs";
import { useNavigate } from "react-router";
const Message = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const chatContainerRef = useRef(null);

  const onConnect = () => {
    console.log("WebSocket Connected.....");
  };

  const onErr = (error) => {
    console.log("errr", error);
  };

  useEffect(() => {
    if (stompClient && auth.user && currentChat) {
      const subscription = stompClient.subscribe(
        `/user/${currentChat.id}/private`,
        onMessageReceive
      );
    }
  });

  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    console.log("Message receive from websocket", receivedMessage);
    setMessages([...messages, receivedMessage]);
  };
  useEffect(() => {
    const sock = new SockJS("http://localhost:8081/ws");
    const stomp = Stom.over(sock);
    setStompClient(stomp);

    stomp.connect({}, onConnect, onErr);
  }, []);

  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  // useEffect(() => {
  //   setMessages([...messages, message.message]);
  // }, [message.message]);

  console.log("chats-----......", message.chats);
  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudnary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = async (value) => {
    const message = {
      chatId: currentChat?.id,
      contents: value,
      image: selectedImage,
    };
    await dispatch(createMessage({ message: message, sendMessageToServer }));

    setMessages([...messages, message]);

    // Clear the input value and selected image
    setMessageInput("");
    setSelectedImage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden ">
        <Grid className="px-2" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-3">
                <IconButton onClick={() => navigate("/")}>
                  <WestIcon />
                </IconButton>
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div>
                  <SearchUser
                    onSelectUser={(user) => {
                      if (!selectedUsers.includes(user)) {
                        setSelectedUsers([...selectedUsers, user]);
                      }
                      setCurrentChat(user); // Set current chat
                      setMessages(user.messages); // Set messages
                    }}
                  />
                </div>
                <div className="h-full space-y-4 mt-5  hideScrollbar">
                  {message.chats.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full Border-Style" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center Box-Shadow p-3">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://media.istockphoto.com/id/849516912/photo/photography.jpg?s=612x612&w=0&k=20&c=CnbND7oL0O2cmbvrze-R3SWELm4ShnOqXyphWb6bFF0=" />
                  <p>
                    {auth.user?.id === currentChat.users[0].id
                      ? currentChat.users[1].firstName +
                        " " +
                        currentChat.users[1].lastName
                      : currentChat.users[0].firstName +
                        " " +
                        currentChat.users[0].lastName}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5"
              >
                {messages.map((item) => (
                  <ChatMessage
                    item={item}
                    key={item.id} // Assuming each message has a unique ID
                    className={
                      item.senderId === auth.user.id
                        ? "sender-message"
                        : "receiver-message"
                    }
                  />
                ))}
              </div>

              <div className="sticky bottom-0 Box-Shadow border-Background">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt="no image  "
                  />
                )}
                <div className="py-3 flex items-center justify-center space-x-5">
                  <input
                    // onKeyPress={(e) => {
                    //   if (e.key === "Enter" && e.target.value) {
                    //     handleCreateMessage(e.target.value);
                    //     setSelectedImage("");
                    //   }
                    // }}

                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && messageInput) {
                        handleCreateMessage(messageInput);
                        setSelectedImage("");
                        setMessageInput(""); // Clear the input value after sending the message
                      }
                    }}
                    className=" bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5 "
                    placeholder="Type message..."
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center ">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chat Selected </p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
