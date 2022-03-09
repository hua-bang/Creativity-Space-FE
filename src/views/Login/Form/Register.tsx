import React from 'react';
import { Form, Input, Button, Link } from '@arco-design/web-react';

interface RegisterProps {
  toggle: () => void;
}

const FormItem = Form.Item;

const Register = ({
  toggle
}: RegisterProps) => {
  return (
    <Form style={{ width: '500px' }} size="large" wrapperCol={{ span: 24, offset: 0}}>
      <FormItem style={{ width: '100%'}}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem>
        <Input placeholder='请输入密码' />
      </FormItem>
      <FormItem>
        <Button type='primary' long>注 册</Button>
      </FormItem>
      <FormItem wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>
        <Link onClick={toggle}>已有帐号， 前往登录</Link>
      </FormItem>
    </Form>
  );
};

export default Register;
