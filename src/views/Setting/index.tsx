import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Form, Input, Button, Message, Upload, Modal } from '@arco-design/web-react';
import { getUserInfo, setUserInfo as fetchSetUserInfo, updatePassword } from '@/api/user';
import { UpdatePasswordInfo, User, UserBasicInfo } from '@/typings/user';
import { BASE_URL } from '@/config/network';
import SkeletonPage from '@/components/Skeleton-Page';
import useToken from '@/hooks/useToken';
import { useNavigate } from 'react-router-dom';

interface UserInfoForm extends UserBasicInfo {
  userAvatar: any;
}

const FormItem = Form.Item;

const Setting = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [token] = useToken();
  const navigate = useNavigate();

  const load = () => {
    getUserInfo().then(res => {
      setUserInfo(res.data);
    }).catch(err => {
      Message.warning('未登录， 为你跳转登录界面');
      navigate('/login');
    });
  };

  const handleUpdatePassword = (data: UpdatePasswordInfo) => {
    updatePassword(data).then(() => {
      Message.success('更新成功');
    }).catch(err => {
      Message.success(err.message);
    });
  };

  const handleUpdateInfo= (data: UserInfoForm) => {
    const file = data.userAvatar[0];
    const { url } = file.response.data;
    const info = {
      ...data,
      avatar: url
    };
    fetchSetUserInfo(info).then(() => {
      Message.success('修改成功。');
      window.location.reload();
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className={styles['setting-page-wrapper']}>
      {
        userInfo ? (
          <>
            <div className={styles['setting-page']}>
              <div className={styles['setting-title']}>
                Settings for <span style={{ color: 'rgb(59, 73, 223)', cursor: 'pointer' }}>{userInfo?.name}</span>
              </div>
              <div className={styles['setting-main']}>
                <h2>账号基本信息</h2>
                <div>
                  <Form onSubmit={handleUpdatePassword} labelCol={{ offset: 0, span: 3 }} initialValues={userInfo}>
                    <FormItem label='🧔 账号' field="username">
                      <Input value={userInfo?.username} disabled maxLength={20} showWordLimit />
                    </FormItem>
                    <FormItem label='🔑 密码' field="password">
                      <Input type="password" placeholder='请输入你的密码' />
                    </FormItem>
                    <FormItem label='🔑 新密码' field="newPassword">
                      <Input type="password" placeholder='请输入你要修改的密码' maxLength={30} showWordLimit />
                    </FormItem>
                    {/* <FormItem label='确认密码' field="rePassword">
                      <Input type="password" placeholder='再次输入你要修改的密码' maxLength={30} showWordLimit />
                    </FormItem> */}
                    <FormItem wrapperCol={{ offset: 3, span: 19 }}>
                      <Button type='primary' htmlType='submit' long>保 存 😊 </Button>
                    </FormItem>
                  </Form>
                </div>
              </div>
              <div className={styles['setting-main']}>
                <h2>用户信息</h2>
                <div>
                  <Form labelCol={{ offset: 0, span: 3 }} onSubmit={handleUpdateInfo} initialValues={userInfo}>
                    <FormItem label="头像" field="userAvatar" required>
                      <Upload
                        listType='picture-card'
                        name='file'
                        limit={1}
                        action={`${BASE_URL}/cos/avatar/upload`}
                        defaultFileList=
                          {userInfo.avatar ? [{ name: 'avatar', url: `${userInfo.avatar}`, uid: 'avatar' }] : []}
                        headers={{
                          Authorization: `Bearer ${token}`
                        }}
                        onPreview={(file: any) => {
                          Modal.info({
                            title: 'Preview',
                            content: <img src={file.url || URL.createObjectURL(file.originFile)} style={{maxWidth: '100%'}} > </img>
                          });
                        }}
                      />
                    </FormItem>
                    <FormItem label='用户名' field="name" required>
                      <Input value="hug" placeholder='请输入用户名' maxLength={20} showWordLimit />
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
                    <FormItem label='个人简介' field="description" required>
                      <Input placeholder='输入个人简介' maxLength={30} showWordLimit />
                    </FormItem>
                    <FormItem wrapperCol={{ offset: 3, span: 19 }}>
                      <Button type='primary' htmlType="submit" long>保 存 😊 </Button>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </div>            
          </>
        ) : (
          <SkeletonPage />
        )
      }
    </div>
  );
};

export default Setting;