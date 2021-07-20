import React, { useEffect } from "react";
import RecipeCard from "./layouts/RecipeCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { getReceipes } from "../store/actions/receipeActions";
import Loader from "./layouts/Loader";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Recipe = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const receipe = useSelector((state) => state.receipe);
  const { receipes, loading, error, filter } = receipe;
  useEffect(() => {
    dispatch(getReceipes());

    // eslint-disable-next-line
  }, []);

  const getData = () => (filter.length !== 0 ? filter : receipes);
  return !loading && !error && receipes.length !== 0 ? (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        {receipes.length !== 0 ? (
          getData().map((doc) => (
            <RecipeCard key={doc.id} id={doc.id} receipes={doc.data} />
          ))
        ) : (
          <h6 style={{ margin: "0 auto" }}>No receipes</h6>
        )}
      </Grid>
    </div>
  ) : (
    <Loader />
  );
};

export default Recipe;
