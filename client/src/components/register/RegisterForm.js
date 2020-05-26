import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { authenticate } from "../../store/actions/authActions";

class RegisterForm extends React.Component {
  state={
    email: '',
    password: ''
  }
  
  onChange = values => {
    this.setState({[values.target.id]: values.target.value})
  }

  onFinish = () => {};

  onSignIn = async () => {
    await this.props.authenticate(this.state, 'signin')
  }

  onSignUp = async () => {
    await this.props.authenticate(this.state, 'signup')
  }

  render () {
    if (this.props.auth) return <Redirect to='/home/'/>
    return (
      <Form
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input email.'},
                            { type: 'email', message: 'Invalid email input'}]}
        >
          <Input id='email' onChange={this.onChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            id='password' onChange={this.onChange}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{float: 'left'}}>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="" style={{float: 'right'}}>
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item style={{marginBottom: '7px'}}>
          <Button id="signin" onClick={this.onSignIn} htmlType="submit" className="register-btn" style={{float: 'left'}}>
            Log in
          </Button>
          <Button id="signup" onClick={this.onSignUp} type="primary" htmlType="submit" className="register-btn" style={{float: 'right'}}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken,
    auth: state.auth.auth,
    authMsg: state.auth.authMsg,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (user, type) => dispatch(authenticate(user, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
  

