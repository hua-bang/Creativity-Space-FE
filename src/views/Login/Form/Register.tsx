import React from 'react';
import { Form, Input, Button, Link, Message } from '@arco-design/web-react';
import { signUp } from '@/api/user';

interface RegisterProps {
  toggle: () => void;
}

const FormItem = Form.Item;

const Register = ({
  toggle
}: RegisterProps) => {

  const handleSubmit = (data: any) => {
    const {
      username,
      password
    } = data;

    signUp(username, password).then(_ => {
      Message.success('注册成功。');
      setTimeout(() => {
        toggle();
      }, 1000);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '500px' }} size="large" wrapperCol={{ span: 24, offset: 0}}>
      <FormItem field="username" style={{ width: '100%'}}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem field="password">
        <Input placeholder='请输入密码' type="password" />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType="submit" long>注 册</Button>
      </FormItem>
      <FormItem wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>
        <Link onClick={toggle}>已有帐号， 前往登录</Link>
      </FormItem>
    </Form>
  );
};

export default Register;
