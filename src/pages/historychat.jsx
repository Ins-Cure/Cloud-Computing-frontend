import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

import { auth, firestore } from "@/utils/firebase/firebase";
import { GetUser } from "@/fetch/getUser";

const History = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const messagesRef = firestore.collection("messages");
  const [doctorID, setuid] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);
        GetUser()
          .then((response) => {
            setuid(response.data.id);
          })
          .catch((error) => {});
      }
    };

    authenticate();
  }, []);

  if (!token) {
    return null;
  }

  const query = messagesRef.where("uid_2", "==", doctorID);

  const [messages, loading, error] = collectionGroup(query, {
    idField: "id",
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log("error query:", error);
    return <div>Error loading message</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10 dark:text-black">
        <h1>This is chat History Page</h1>
      </div>
    </>
  );
};

export default History;
