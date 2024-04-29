/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { appConfig } from "@/configs/app.config";
import { useSocket } from "@/hooks/useSocket";
import useFetch from "@/hooks/useFetch";
import PaginationBar from "../home/PaginationBar";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // Import an MUI chat icon
import ChatIcon from "@mui/icons-material/Chat"; // Import an MUI chat icon
import SendIcon from "@mui/icons-material/Send"; // Import MUI Send Icon

interface Message {
  id: string;
  text: string;
  performingUser: string;
  date?: Date;
}
interface LiveChatProps {
  chatId: string;
  performingUser: string;
}
const LiveChat: React.FC<LiveChatProps> = ({ chatId, performingUser }) => {
  const MESSAGES_PER_PAGE = 10;
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const { emit, on } = useSocket(appConfig.apiBaseUrl, {
    id: chatId,
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 500,
  });

  // Listen for message request
  useEffect(() => {
    const unsubscribe = on("recieveMessage", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      unsubscribe();
    };
  }, [on]);

  // Send message to the server
  const sendMessage = () => {
    emit("message", { text: input, performingUser });
    setMessages([...messages, { id: chatId, text: input, performingUser }]);
    setInput("");
  };

  const { data, status, error } = useFetch<any>(
    `recipe/get-recipe-chat/${chatId}`
  );

  useEffect(() => {
    if (error) {
      //toast.error(error?.message || t("site.messages.error.default"),toastConfig)
      console.error("Request error: ", error);
    }
  }, [error]);

  useEffect(() => {
    if (status === "success" && data) {
      setMessages(data.messages.reverse());
    }
  }, [data, setMessages, status]);

  useEffect(() => {
    const startIndex = (page - 1) * MESSAGES_PER_PAGE;
    const endIndex = page * MESSAGES_PER_PAGE;
    if (messages) {
      setDisplayedMessages(messages.slice(startIndex, endIndex));
    }
  }, [page, messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 3,
        maxHeight: 600,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          {" "}
          {/* Container for the title and optional icon */}
          <ChatIcon sx={{ mr: 1, color: "primary.main", fontSize: 28 }} />{" "}
          {/* Chat icon with right margin */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.1rem",
              color: "primary.main",
              textShadow: "1px 1px 2px gray",
            }}
          >
            Live Chat
          </Typography>
        </Box>
        <PaginationBar
          pageCount={Math.ceil(messages.length / MESSAGES_PER_PAGE)}
          currentPage={page}
          setCurrentPage={setPage}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        {displayedMessages?.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%", // This assumes the parent has a defined height
              opacity: 0.5, // Subtle fade style for the whole container
              animation: "fadeIn 1s ease-out", // A simple fade-in animation
              "@keyframes fadeIn": {
                // Define the keyframes for the animation
                from: { opacity: 0 },
                to: { opacity: 0.5 },
              },
            }}
          >
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 40, color: "primary.main" }}
            />
            <Typography
              sx={{ mt: 2, mb: 5, color: "text.secondary" }}
              variant="body1"
            >
              No messages yet
            </Typography>
          </Box>
        )}
        {displayedMessages?.map((message, index) => (
          <Box
            key={index}
            sx={{
              alignSelf:
                message.performingUser === performingUser
                  ? "flex-start"
                  : "flex-end",
              backgroundColor:
                message.performingUser === performingUser
                  ? "primary.main"
                  : "secondary.main",
              borderRadius: "10px",
              color: "white",
              padding: "10px",
              margin: "5px",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                fontSize: "0.75rem",
                marginBottom: "4px",
              }}
            >
              {message.date &&
                new Date(message?.date)
                  .toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", " at")}
            </Typography>
            <Typography>
              {message.performingUser.split("@")[0] + ": " + message.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          placeholder="Type a message..."
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
          sx={{ mr: 1, flex: 1 }} // Use flex grow and add margin to the right
        />
        <Button
          onClick={sendMessage}
          variant="contained" // Changed to 'contained' for better visual prominence
          color="primary"
          sx={{
            py: "6px", // Use padding shorthand for top and bottom
            px: "16px", // Use padding shorthand for left and right
            fontSize: "0.875rem",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "secondary.main",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            },
          }}
          startIcon={<SendIcon />}
        ></Button>
      </Box>
    </Box>
  );
};

export default LiveChat;
