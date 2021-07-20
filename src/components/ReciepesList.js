import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Header from "./layouts/Header";
import ReceipeListItem from "./layouts/ReceipeListItem";
import { useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    height: "calc(100vh - 90px)",
    overflow: "scroll",
  },
}));

const ReciepesList = () => {
  const classes = useStyles();
  const receipe = useSelector((state) => state.receipe);
  const { receipes, loading, error, filter } = receipe;
  const getData = () => (filter.length !== 0 ? filter : receipes);

  return !loading && !error ? (
    <div className={classes.root}>
      <Helmet>
        <title>Admin Page</title>
        <meta name="description" content="Admin Page for manage recipes" />
      </Helmet>
      <Header />
      <List
        className={classes.list}
        component="nav"
        aria-label="main mailbox folders"
      >
        {receipes.length !== 0 ? (
          getData().map((doc) => (
            <ReceipeListItem key={doc.id} id={doc.id} receipes={doc.data} />
          ))
        ) : (
          <h6 style={{ margin: "0 auto" }}>No receipes</h6>
        )}
      </List>
    </div>
  ) : (
    <Loader />
  );
};
export default ReciepesList;
