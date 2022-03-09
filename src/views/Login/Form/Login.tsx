import React from 'react';
import { Form, Input, Button, Checkbox, Link } from '@arco-design/web-react';

interface LoginProps {
  toggle: () => void
}

const FormItem = Form.Item;

const Login = ({
  toggle
}: LoginProps) => {
  return (
    <Form style={{ width: '500px' }} size="large" wrapperCol={{ span: 24, offset: 0}}>
      <FormItem style={{ width: '100%'}}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem>
        <Input placeholder='请输入密码' />
      </FormItem>
      <FormItem>
        <Button type='primary' long>登 录</Button>
      </FormItem>
      <FormItem wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>
        <Link onClick={toggle}>还没有账号，先去注册</Link>
      </FormItem>
    </Form>
  );
};

export default Login;
