import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, admin, ...rest }) => {
  const receipe = useSelector((state) => state.receipe);
  const { login, isAdmin } = receipe;
  return (
    <Route
      {...rest}
      render={(props) =>
        !admin ? (
          !login ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        ) : !isAdmin || !login ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
