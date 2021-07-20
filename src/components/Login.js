import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Loader from "./layouts/Loader";
import { login } from "../store/actions/receipeActions";
import { LOGIN_USER } from "../store/constants/types";

const Login = ({ history }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin1234");

  const dispatch = useDispatch();
  const receipe = useSelector((state) => state.receipe);
  const { loading, error } = receipe;

  const loginHandler = () => {
    //login user
    dispatch(login(email, password));
    history.push("/");
  };
  return !loading && !error ? (
    <div className="forms forms_center">
      <Button variant="contained" color="sucess">
        <Link to="/" style={{ textDecoration: "none" }}>
          Back to home
        </Link>
      </Button>
      <form
        noValidate
        autoComplete="off"
        style={{ width: "100%" }}
        className="forms_center"
      >
        <TextField
          id="standard-basic"
          style={{ width: "90%", maxWidth: "500px", margin: "10px 5%" }}
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="standard-basic"
          style={{ width: "90%", maxWidth: "500px", margin: "10px 5%" }}
          label="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={loginHandler}
          style={{
            display: "block",
            margin: "20px 0",
            width: "50%",
            maxWidth: "300px",
          }}
        >
          <strong className="center space_around">
            Login as Admin
            <ArrowRight style={{ fontSize: "30px" }} />
          </strong>
        </Button>
        <Divider style={{ width: "90%", height: "3px", margin: "14px auto" }} />
        <Button
          variant="contained"
          color="secondary"
          style={{ display: "block", width: "50%", maxWidth: "300px" }}
          onClick={() => {
            dispatch({
              type: LOGIN_USER,
              payload: false,
            });
            history.push("/");
          }}
        >
          <strong className="center space_around">
            Continue as guest
            <ArrowRight style={{ fontSize: "30px" }} />
          </strong>
        </Button>
      </form>
    </div>
  ) : (
    <Loader />
  );
};

export default Login;
