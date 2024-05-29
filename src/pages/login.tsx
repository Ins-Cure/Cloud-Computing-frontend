import React from "react";
import { useState } from "react";
import Navbar from "@/components/navbar";

const LoginUser = () => {
  const [token, setToken] = useState(false);
  const [bearerToken, setBearerToken] = useState("");

  function handlefetch(email: string, pass: string) {
    const data = {
      email: email,
      pass: pass,
    };

    // Configure the fetch request with method, headers, and body
    fetch("http://localhost:8080/inscure/login", {
      method: "POST", // Use POST method to send data
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(data), // Convert data to JSON string
    })
      .then(function (response) {
        if (!response.ok) {
          // Check if the response status is not OK
          return response.json().then((errorData) => {
            throw new Error(
              errorData.message || `HTTP error! status: ${response.status}`
            );
          });
        }
        return response.json(); // Parse response JSON
      })
      .then(function (data) {
        // Handle data from response
        console.log(data); // Log or process the received data
        setToken(!token);
        console.log(data.data);
        setBearerToken(data.data);
        // alert(`Success Login`); // Show success message
      })
      .catch(function (error) {
        // Handle errors
        console.error("Error:", error);
        alert(`Error: ${error.message}`); // Show error message in a window
      });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget); // Get form data

    const email = formData.get("email"); // Get value of "email" input
    const password = formData.get("password"); // Get value of "password" input

    if (typeof email === "string" && typeof password === "string") {
      handlefetch(email, password); // Call handleFetch with form input values
    } else {
      // Handle the case where email or password is null or not a string
      console.error("Email or password is missing or not a string");
    }

    event.currentTarget.reset();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10 bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login Page</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>

        <div className="token-div bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {token ? "You are logged in" : "Not logged in yet"}
          </h2>
          {token && (
            <>
              <h3 className="text-lg text-gray-600">Here is your token:</h3>
              <p className="text-gray-700 break-all">{bearerToken}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginUser;
