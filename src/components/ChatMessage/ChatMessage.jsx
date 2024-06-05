import React, { useEffect, useState } from "react";
import { auth, firestore } from "@/utils/firebase/firebase";
import { GetUser } from "@/fetch/getUser";

function ChatMessage(props) {
  const [currID, setcurrID] = useState("");
  useEffect(() => {
    GetUser()
      .then((response) => {
        setcurrID(response.data.id);
      })
      .catch((error) => {});
  });

  const { text, uid } = props.message;

  const messageClass = uid === currID ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatMessage;
