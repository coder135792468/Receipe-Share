import React from "react";
import Header from "./layouts/Header";
import Recipe from "./Recipe";
import { useSelector } from "react-redux";
import Login from "./Login";
import { Helmet } from "react-helmet";

const HomeScreen = () => {
  const receipe = useSelector((state) => state.receipe);
  const { loading, error } = receipe;

  return !loading && !error ? (
    <>
      <Helmet>
        <title>Recipe Share | Home</title>
        <meta name="description" content="Share your receipes here" />
      </Helmet>
      <Header />
      <Recipe />
    </>
  ) : (
    <Login />
  );
};

export default HomeScreen;
