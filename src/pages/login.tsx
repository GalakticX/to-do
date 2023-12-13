import React, { useState } from "react";
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {error && <h3>{error}</h3>}
      <form action="/login" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input id="username" type="text" onChange={handleChange} required />
        </label>
        <label htmlFor="password">
          {" "}
          Password
          <input type="password" onChange={handleChange} required />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
