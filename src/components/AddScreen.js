import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
import { Link } from "react-router-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import { addRecipe } from "../store/actions/receipeActions";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  input: {
    width: "90%",
    maxWidth: "500px",
    margin: "10px 5%",
  },
}));

const AddScreen = ({ history }) => {
  const dispatch = useDispatch();
  const receipe = useSelector((state) => state.receipe);
  const { loading, error, isAdmin } = receipe;
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const addHandler = (e) => {
    dispatch(
      addRecipe({
        title: title || "No title",
        description: description || "No Description",
        image:
          image ||
          "https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg",
        likes: 0,
        approved: isAdmin ? true : false,
      })
    );
    history.push("/");
  };
  return !loading && !error ? (
    <div className="forms forms_center">
      <Helmet>
        <title>ADD RECEIPE </title>
        <meta name="description" content="Admin Page for manage recipes" />
      </Helmet>
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
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          id="standard-basic"
          className={classes.input}
          label="Enter your title"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
        />
        <TextareaAutosize
          maxRows={9}
          minRows={9}
          aria-label="maximum height empty textarea"
          placeholder="Enter Description & Procedure"
          className={classes.input}
          value={description}
          onChange={({ target: { value } }) => setDescription(value)}
          label="Enter your title"
          id="standard-basic"
          style={{ width: "90%", maxWidth: "500px", margin: "10px 5%" }}
        />
        <TextField
          id="standard-basic"
          className={classes.input}
          label="Enter your Image Url"
          value={image}
          onChange={({ target: { value } }) => setImage(value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={addHandler}
          style={{ display: "block", width: "50%", maxWidth: "300px" }}
        >
          <strong className="center space_around">
            {isAdmin ? "ADD RECEIPE" : "Submit for approval"}
            <ArrowRight style={{ fontSize: "30px" }} />
          </strong>
        </Button>
      </form>
    </div>
  ) : (
    <Loader />
  );
};

export default AddScreen;
