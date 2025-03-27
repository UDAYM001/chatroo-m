import React from "react";
import { auth, db } from "../firebase.js";
import { Button } from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function SignOut() {
  // Function to clear all chat messages
  const clearChat = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear the entire chat?");
    if (confirmClear) {
      const querySnapshot = await getDocs(collection(db, "messages"));
      querySnapshot.forEach(async (message) => {
        await deleteDoc(doc(db, "messages", message.id));
      });
      alert("Chat cleared successfully!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#395dff",
        padding: "20px 15px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.3)",
        zIndex: "1000",
      }}
    >
      {/* Left Button */}
      <div style={{ position: "absolute", left: "15px" }}>
        <Button
          onClick={() => auth.signOut()}
          variant="outlined"
          style={{
            padding: "6px 12px",
            borderRadius: "25px",
            borderColor: "#fff",
            color: "#fff",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Sign Out
        </Button>
      </div>

      {/* Title */}
      <div
        style={{
          color: "#fff",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "jost, sans-serif",
        }}
      >
        Welcome
      </div>

      {/* Right Button */}
      <div style={{ position: "absolute", right: "55px" }}>
        <Button
          onClick={clearChat}
          variant="outlined"
          style={{
            padding: "6px 12px",
            borderRadius: "25px",
            borderColor: "#fff",
            color: "#fff",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Clear Chat
        </Button>
      </div>
    </div>
  );
}

export default SignOut;
