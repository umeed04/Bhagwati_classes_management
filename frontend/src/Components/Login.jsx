import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }

  }, []);

  // Login Function
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

      // Save Token
      localStorage.setItem(
        "token",
        res.data.token
      );

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
        background:
          "linear-gradient(135deg, #eed4d4, #f0dbdb)",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "380px",
          background: "#fff",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >

        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >

          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#bb2b2b",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 15px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            A
          </div>

          <h2
            style={{
              margin: 0,
              color: "#5c1616",
            }}
          >
            Admin Login
          </h2>

          <p
            style={{
              color: "gray",
              fontSize: "14px",
              marginTop: "6px",
            }}
          >
            Welcome 
          </p>

        </div>

        {/* Email */}
        <div style={{ marginBottom: "18px" }}>

          <label
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Email
          </label>

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
              padding: "12px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
            }}
          />

        </div>

        {/* Password */}
        {/* Password */}
<div style={{ marginBottom: "20px" }}>

  <label
    style={{
      fontSize: "14px",
      fontWeight: "600",
      color: "#333",
    }}
  >
    Password
  </label>

  <div
    style={{
      position: "relative",
      marginTop: "6px",
    }}
  >

    <input
      type={showPassword ? "text" : "password"}
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
        padding: "12px 45px 12px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "15px",
      }}
    />

    <div
      onClick={() =>
        setShowPassword(!showPassword)
      }
      style={{
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#666",
        fontSize: "16px",
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </div>

  </div>

</div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: loading
              ? "gray"
              : "#941c1c",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >

          {loading
            ? "Please Wait..."
            : "Login"}

        </button>

      </div>

    </div>

  );

}

export default Login;