import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./home";
import ProjectPage from "./projectPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <Container>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/projects" component={ProjectPage} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
