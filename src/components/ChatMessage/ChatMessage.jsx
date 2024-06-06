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

  const messageClass =
    uid === currID
      ? "bg-blue-500 text-white self-end"
      : "bg-gray-300 text-black self-start";

  return (
    <>
      <div
        className={`flex ${uid === currID ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`p-2 rounded-lg mb-2 max-w-xs break-words ${messageClass}`}
        >
          <p>{text}</p>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
