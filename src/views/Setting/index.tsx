import React from 'react';
import styles from './index.module.scss';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { Form, Input, Button } from '@arco-design/web-react';

const FormItem = Form.Item;

const Setting = () => {

  const { userStore } = useStore();

  return (
    <div className={styles['setting-page']}>
      <div className={styles['setting-title']}>
        Settings for <span style={{ color: 'rgb(59, 73, 223)', cursor: 'pointer' }}>{userStore.userInfo?.name}</span>
      </div>
      <div className={styles['setting-main']}>
        <h2>账号基本信息</h2>
        <div>
          <Form labelCol={{ offset: 0, span: 3 }}>
            <FormItem label='🧔 账号' field="username" >
              <Input value={userStore.userInfo?.username} disabled maxLength={20} showWordLimit />
            </FormItem>
            <FormItem label='🔑 密码' field="password">
              <Input type="password" placeholder='请输入你要修改的密码' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem label='确认密码' field="rePassword">
              <Input type="password" placeholder='再次输入你要修改的密码' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem wrapperCol={{ offset: 3, span: 19 }}>
              <Button type='primary' long>保 存 😊 </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <div className={styles['setting-main']}>
        <h2>用户信息</h2>
        <div>
          <Form labelCol={{ offset: 0, span: 3 }}>
            <FormItem label='用户名' field="name" required>
              <Input placeholder='请输入用户名' maxLength={20} showWordLimit />
            </FormItem>
            <FormItem label='手机号' field="phone" required>
              <Input placeholder='请输入手机号' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem label='职业' field="job_title" required>
              <Input placeholder='请输入职业' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem label='公司' field="company" required>
              <Input placeholder='请输入公司' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem label='个人主页' field="home_page" required>
              <Input placeholder='请输入个人主页' maxLength={30} showWordLimit />
            </FormItem>
            <FormItem wrapperCol={{ offset: 3, span: 19 }}>
              <Button type='primary' long>保 存 😊 </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default observer(Setting);