import { Form, Input, Button, Divider, Alert } from "antd";

import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class RegisterPage extends Component {
  state = {
    msg: null,
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //check for error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }
  onFinish = (values) => {
    const { name, email, password } = values;
    const user = {
      name,
      email,
      password,
    };

    //aatept to user
    this.props.register(user);
  };
  onChange = (values) => {
    const { msg } = this.state;
    if (msg !== null) {
      this.setState({ msg: null });
    }
  };

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/project" />;
    }
    return (
      <Form
        name="basic"
        onFinish={this.onFinish}
        onChange={this.onChange}
        style={{
          width: 500,
          padding: 24,
          margin: 50,
          background: "white",
        }}
      >
        <h2>Sign up</h2>
        <Divider />
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{min: 8, required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
        <h4>or</h4>
        <Link to="/signin">Sign in</Link>
        {this.state.msg ? (
          <Alert message={this.state.msg} type="error" />
        ) : null}
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterPage
);
