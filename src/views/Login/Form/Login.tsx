import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Link, Message } from '@arco-design/web-react';
import { signIn } from '@/api/user';
import { useNavigate } from 'react-router-dom';
interface LoginProps {
  toggle: () => void
}

const FormItem = Form.Item;

const Login = ({
  toggle
}: LoginProps) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: any) => {
    setLoading(true);
    const { username, password } = data;
    signIn(username, password).then(res => {
      const { accessToken } = res.data;
   
      // TODO: set accessToken to local
      Message.success('登录成功');
      setTimeout(() => {
        navigate('/home/content');
      }, 1000);
    }).catch(err => {
      Message.warning(err.message);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '500px' }} size="large" wrapperCol={{ span: 24, offset: 0}}>
      <FormItem field="username" style={{ width: '100%'}}>
        <Input placeholder='请输入用户名' />
      </FormItem>
      <FormItem field="password">
        <Input type="password" placeholder='请输入密码' />
      </FormItem>
      <FormItem>
        <Button htmlType="submit" loading={loading} type='primary' long>登 录</Button>
      </FormItem>
      <FormItem wrapperCol={{ offset: 0, span: 24 }} style={{ textAlign: 'right' }}>
        <Link onClick={toggle}>还没有账号，先去注册</Link>
      </FormItem>
    </Form>
  );
};

export default Login;
