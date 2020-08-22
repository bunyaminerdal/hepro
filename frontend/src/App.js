import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import "antd/dist/antd.css";

import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/home";
import ProjectPage from "./pages/projectPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppNavbar />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/project" component={ProjectPage} />
            <Route exact path="/signin" component={LoginPage} />
            <Route exact path="/signup" component={RegisterPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
