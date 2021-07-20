import React from "react";
import "../styles/receipe_screen.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
const ReceipeScreen = ({ id, data, show, setShow }) => {
  const { title, description, image } = data;
  return (
    <div
      className="receipe_screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h2>
        <IconButton onClick={() => setShow(false)} className="back_button">
          <ArrowBackIcon />
        </IconButton>
        <span>{title.toUpperCase()}</span>
      </h2>
      <div className="desc">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ReceipeScreen;
