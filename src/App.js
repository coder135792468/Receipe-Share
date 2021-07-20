import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import HomeScreen from "./components/HomeScreen";
import AddScreen from "./components/AddScreen";
import PrivateRoute from "./components/PrivateRoute";
import ReciepesList from "./components/ReciepesList";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/add" admin={false} component={AddScreen} />
        <PrivateRoute path="/receipe" admin={true} component={ReciepesList} />
        <Route exact path="/" component={HomeScreen} />
      </Switch>
    </Router>
  );
}

export default App;
