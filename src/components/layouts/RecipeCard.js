import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { updateData } from "../../store/actions/receipeActions";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ReceipeScreen from "../ReceipeScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    width: "100%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  gridCard: {
    margin: "auto",
  },
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

const RecipeCard = ({ id, receipes }) => {
  const { image, description, likes: like, title, approved } = receipes;
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(like);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const updateLikes = () => {
    dispatch(
      updateData(id, {
        likes: liked ? likes - 1 : likes + 1,
        approved: true,
      })
    );
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };
  return (
    approved && (
      <Grid className={classes.gridCard} item xs={24} md={3} xl={3}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={image}
            title="Paella dish"
          />
          <CardHeader id={id} title={title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.length > 0
                ? description.slice(0, 100) + "..."
                : description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableSpacing>
            <IconButton onClick={updateLikes} aria-label="add to favorites">
              <FavoriteIcon color={liked ? "secondary" : "none"} />
            </IconButton>
            <Chip
              onClick={updateLikes}
              clickable
              color="primary"
              label={`${likes} ${likes > 1 ? "Likes" : "Like"}`}
            />
            <IconButton onClick={() => setShow(true)}>
              <ArrowForwardIcon />
            </IconButton>
            {show && (
              <ReceipeScreen
                id={id}
                data={receipes}
                setShow={setShow}
                showCard={show}
              />
            )}
          </CardActions>
        </Card>
      </Grid>
    )
  );
};
export default RecipeCard;
