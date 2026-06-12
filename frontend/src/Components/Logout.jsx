import axios from "axios";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  // ✅ Auto Redirect if Logged In
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }

  }, []);


  // ✅ Login Function
  const handleLogin = async () => {

    if (!email || !password) {

      return alert("Please fill all fields");

    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        }
      );

      // ✅ Save Token
      localStorage.setItem(
        "token",
        res.data.token
      );

      alert(res.data.message);

      navigate("/home");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2",
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          width: "320px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px gray",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Admin Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && handleLogin()
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && handleLogin()
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: loading ? "gray" : "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >

          {loading ? "Please Wait..." : "Login"}

        </button>

      </div>

    </div>

  );

}

export default Login;const logout = () => {

  localStorage.removeItem("token");

  navigate("/");

};