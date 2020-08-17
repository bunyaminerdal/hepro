import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";

import { Container } from "reactstrap";
import Home from "./home";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import moduleName from "";

class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Home />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
