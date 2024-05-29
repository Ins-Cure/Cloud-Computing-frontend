import React from "react";
import Navbar from "@/components/navbar";

const registerUser = () => {
  function handlefetch(
    name: string,
    email: string,
    notelp: string,
    pass: string
  ) {
    const data = {
      name: name,
      email: email,
      notelp: notelp,
      pass: pass,
    };
    console.log(data);
    // Configure the fetch request with method, headers, and body
    fetch("http://localhost:8080/inscure/add", {
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
        alert("Data submitted successfully!"); // Show success message
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

    const name = formData.get("name"); // Get value of "name" input
    const email = formData.get("email"); // Get value of "email" input
    const notelp = formData.get("notelp"); // Get value of "notelp" input
    const password = formData.get("password"); // Get value of "password" input

    if (
      typeof email === "string" &&
      typeof password === "string" &&
      typeof name === "string" &&
      typeof notelp === "string"
    ) {
      handlefetch(name, email, notelp, password); // Call handleFetch with form input values
    } else {
      // Handle the case where email or password is null or not a string
      console.error("Email or password is missing or not a string");
    }

    event.currentTarget.reset();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="formRegister flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-800">Register Page</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="notelp"
            placeholder="Phone Number"
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
            className="button-register p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default registerUser;
