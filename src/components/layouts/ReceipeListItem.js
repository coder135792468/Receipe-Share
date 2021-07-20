import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import { makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { updateData, deleteReceipe } from "../../store/actions/receipeActions";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  sidebtn: {
    margin: "0 10px",
  },
  img: {
    borderRadius: "5px",
    width: "40px",
  },
}));
const ReceipeListItem = ({ id, receipes }) => {
  const { image, description, title, approved: isApproved } = receipes;
  const classes = useStyles();
  const [approved, setApproved] = useState(isApproved);
  const dispatch = useDispatch();
  const setForApproval = (data) => {
    dispatch(
      updateData(id, {
        approved: data,
      })
    );
    setApproved(data);
    alert("Done!!!");
  };

  const deleteData = () => {
    dispatch(deleteReceipe(id));
  };
  return (
    <>
      <ListItem>
        <ListItemIcon>
          {image ? (
            <img src={image} alt={title} className={classes.img} />
          ) : (
            <RestaurantIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={title} />
        <Button
          onClick={() => setForApproval(true)}
          className={classes.sidebtn}
        >
          <CheckIcon />
        </Button>
        <Button
          onClick={() => setForApproval(false)}
          className={classes.sidebtn}
        >
          <ClearIcon />
        </Button>
        <Button color={approved ? "primary" : "secondary"}>
          {approved ? <CheckCircleOutlineIcon /> : <CancelIcon />}
        </Button>
      </ListItem>
      <p style={{ padding: "0 5px" }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          style={{ float: "right" }}
          onClick={deleteData}
        >
          Delete
        </Button>
      </p>
    </>
  );
};

export default ReceipeListItem;
