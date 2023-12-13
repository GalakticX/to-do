import react, { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  async function handleSubmit() {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "content-Type": "application.json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        setError("Invalid Form Credentials");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  }

  return (
    <div>
      {error && <h3>{error}</h3>}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input id="username" type="text" />
        </label>
        <label htmlFor="password">
          password
          <input id="password" type="password" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Register;
