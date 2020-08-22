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
import { Layout } from "antd";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const { Header, Content, Footer } = Layout;

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
              <AppNavbar />
            </Header>
            <Content
              className="site-layout"
              style={{ padding: "0 50px", marginTop: 64 }}
            >
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/project" component={ProjectPage} />
                <Route exact path="/signin" component={LoginPage} />
                <Route exact path="/signup" component={RegisterPage} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
