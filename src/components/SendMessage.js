import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { InputBase, Button, Box, Paper } from "@mui/material";

function SendMessage() {
  const [message, setMessage] = useState("");

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("You must be signed in to send a message.");
      return;
    }

    const { uid, photoURL } = auth.currentUser;

    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        photoURL,
        uid,
        createdAt: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSendMessage}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "#fafafa",
        p: 1,
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid lightgray",
      }}
    >
      <Paper
        sx={{
          p: "2px 10px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "85%",
          borderRadius: "30px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, px: 1 }}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "20px",
            ml: 1,
            bgcolor: "#395dff",
            "&:hover": { bgcolor: "#2c4be0" },
          }}
        >
          Send
        </Button>
      </Paper>
    </Box>
  );
}

export default SendMessage;
