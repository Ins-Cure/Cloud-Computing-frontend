import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import ChatMessage from "@/components/ChatMessage/ChatMessage.jsx";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { auth, firestore } from "@/utils/firebase/firebase";
import { GetUser } from "@/fetch/getUser";
import { User } from "@/entity/user";
import { setUserId } from "firebase/analytics";
import { DocumentData } from "firebase/firestore";

function ChatRoom({ doctorID }) {
  console.log("ini doctor id", doctorID);
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");

  const [uid, setuid] = useState("");

  useEffect(() => {
    GetUser()
      .then((response) => {
        setuid(response.data.id);
      })
      .catch((error) => {});
  });

  //   const { uid, photoURL } = auth.currentUser;

  const q = messagesRef
    .orderBy("createdAt")
    .where("uid", "in", [doctorID, uid])
    .where("uid_2", "in", [doctorID, uid]);

  const [messages, loading, error] = useCollectionData(q, {
    idField: "id",
  });
  const [formValue, setFormValue] = useState("");

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log("error query:", error);
    return <div>Error loading message</div>;
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      uid_2: doctorID,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} uid={uid} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}
export default ChatRoom;
