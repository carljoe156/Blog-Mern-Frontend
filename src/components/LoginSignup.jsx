import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { Alert, Snackbar } from "@mui/material";
import { DataContext } from "./context/dataProvider";
import { useNavigate } from "react-router";
import blog_img from "./images/blogimg.png";

function LoginSignup() {
  const navigator = useNavigate();
  const { setAccount } = useContext(DataContext);
  const [flag, setFlag] = useState(false); // Controls whether Login or Signup is shown

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigator("/home");
    }
  }, [navigator]);

  function SignUp() {
    const [toOpen, setToOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [signUp, setSignUp] = useState({
      username: "",
      email: "",
      password: "",
    });

    function showSnackBar(message) {
      setToOpen(true);
      setErrorMessage(message);
    }

    function onChangeValues(e) {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }

    async function onSignUpSubmit() {
      let isValidated = true;
      let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let strongRegExp = /(?=.*?[#?!@$%^&*-])/;
      let whitespaceRegExp = /^$|\s+/;

      if (!signUp.username || !signUp.email || !signUp.password) {
        isValidated = false;
        showSnackBar("All fields are required!");
      } else if (!signUp.email.match(validRegex)) {
        isValidated = false;
        showSnackBar("Enter a valid email");
      } else if (signUp.password.match(whitespaceRegExp)) {
        isValidated = false;
        showSnackBar("Whitespaces are not allowed in password");
      } else if (!signUp.password.match(strongRegExp)) {
        isValidated = false;
        showSnackBar("Weak password! Include a special character.");
      }

      if (isValidated) {
        setLoading(true);
        try {
          const config = { headers: { "Content-Type": "application/json" } };
          const response = await axios.post(
            "http://localhost:5000/auth/signup",
            signUp,
            config
          );
          setAccount(response.data.username);
          setLoading(false);
          setFlag(true);
        } catch (e) {
          showSnackBar(e.response?.data?.msg || "Signup failed");
          setLoading(false);
        }
      }
    }

    return (
      <div className="signup-container">
        <Snackbar
          open={toOpen}
          autoHideDuration={6000}
          onClose={() => setToOpen(false)}
        >
          <Alert
            onClose={() => setToOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        <div className="signup-form">
          <img src={blog_img} className="blog-img" alt="Signup" />
          <TextField
            onChange={onChangeValues}
            required
            label="Username"
            variant="outlined"
            name="username"
          />
          <TextField
            onChange={onChangeValues}
            required
            label="Email Address"
            variant="outlined"
            name="email"
          />
          <TextField
            onChange={onChangeValues}
            required
            label="Password"
            type="password"
            variant="outlined"
            name="password"
          />

          <Button color="success" onClick={onSignUpSubmit} variant="contained">
            {isLoading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Button
            variant="text"
            color="primary"
            onClick={() => setFlag(true)}
            style={{ marginTop: "10px" }}
          >
            Already have an account? Login
          </Button>
        </div>
      </div>
    );
  }

  function Login() {
    const [toOpen, setToOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [logInValues, setLoginValues] = useState({
      email: "",
      password: "",
    });

    function showSnackBar(message) {
      setToOpen(true);
      setErrorMessage(message);
    }

    function onChangeValues(e) {
      setLoginValues({ ...logInValues, [e.target.name]: e.target.value });
    }

    async function onLoginClick() {
      try {
        setLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          logInValues,
          config
        );

        localStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        localStorage.setItem("username", response.data.username);
        localStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        setAccount({ username: response.data.username });

        showSnackBar(response.data.msg);
        setLoading(false);
        navigator("/home");
      } catch (e) {
        setLoading(false);
        showSnackBar(e.response?.data?.msg || "Login failed");
      }
    }

    return (
      <div className="signup-container">
        <Snackbar
          open={toOpen}
          autoHideDuration={6000}
          onClose={() => setToOpen(false)}
        >
          <Alert
            onClose={() => setToOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        <div className="signup-form">
          <img src={blog_img} className="blog-img" alt="Login" />
          <TextField
            required
            name="email"
            label="Email Address"
            variant="outlined"
            onChange={onChangeValues}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            onChange={onChangeValues}
            variant="outlined"
          />

          <Button color="success" onClick={onLoginClick} variant="contained">
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Button
            variant="text"
            color="primary"
            onClick={() => setFlag(false)}
            style={{ marginTop: "10px" }}
          >
            New to Blogist ? Create Account
          </Button>
        </div>
      </div>
    );
  }

  return flag ? <Login /> : <SignUp />;
}

export default LoginSignup;
