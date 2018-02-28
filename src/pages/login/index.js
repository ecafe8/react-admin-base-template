import React from 'react';
import css from './index.less';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const formCreate = Form.create;

@formCreate()
export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单验证: ', values);
      }
    });
  };


  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit} className={css.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入你的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          <a className={css.loginFormForgot} href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className={css.loginFormButton}>
            登录
          </Button>
          或 <a href="">注册</a>
        </FormItem>
      </Form>
    );
  }


  render() {

    return (
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.wrap}>
            <div className={css.header}>
              <div className={css.title}>盛夏管理后台</div>
              <div className={css.subTitle}>成都盛夏科技 - 企业级应用解决方案提供商</div>
            </div>
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}
