import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CLEAR_SEARCH } from "../../store/constants/types";
import { searchText } from "../../store/actions/receipeActions";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import "../../styles/header.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 0.7,
    margin: "0 auto",
    background: "rgba(0,0,0,0.1)",
    padding: "3px 20px",
    borderRadius: "40px",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const receipe = useSelector((state) => state.receipe);

  const [text, setText] = useState("");
  const { login, isAdmin } = receipe;

  useEffect(() => {
    if (!text) {
      dispatch({
        type: CLEAR_SEARCH,
      });
    }
    // eslint-disable-next-line
  }, [text]);
  const onChange = ({ target: { value } }) => {
    setText(value);
    dispatch(searchText(text));
  };
  return (
    <Paper
      style={{ positon: "sticky", top: "0" }}
      onSubmit={(e) => e.preventDefault()}
      component="form"
      className={classes.root}
    >
      <Link style={{ margin: "0 6px" }} to="/">
        <HomeIcon />
      </Link>
      <Divider className={classes.divider} orientation="vertical" />
      {isAdmin && login && (
        <Link to="/receipe">
          <DashboardIcon />
        </Link>
      )}
      <InputBase
        className={classes.input}
        value={text}
        onChange={onChange}
        placeholder="Search Receipe..."
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        {!login && <PersonIcon onClick={() => history.push("/login")} />}

        {login && <AddIcon onClick={() => history.push("/add")} />}
      </IconButton>
    </Paper>
  );
};

export default Header;
