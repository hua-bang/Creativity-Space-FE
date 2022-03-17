import React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore';
import styles from './index.module.scss';
import { Avatar, Button, Input } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

interface CommentEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onFinish?: () => void; 
  withAvatar?: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = (props) => {
  
  const {
    onFinish,
    withAvatar = true,
    ...rest
  } = props;

  const { userStore } = useStore();

  const isLogin = userStore.isLogin;

  return (
    <div className={styles['comment-editor']}>
      <div className={styles['comment-editor-main']}>
        {
          withAvatar && (
            <div className={styles['comment-editor-avatar']}>
              <Avatar size={40}>
                {
                  userStore.userInfo?.avatar
                    ? <img src={userStore.userInfo.avatar} />
                    : <IconUser />
                }
              </Avatar>
            </div>    
          )
        }
        <div className={styles['comment-editor-text-area']}>
          <Input.TextArea {...rest} rows={3} placeholder="输入评论（Enter换行）" />
        </div>
      </div>      
      <div className={styles['comment-editor-btn-area']}>
        <Button type='primary' disabled={!isLogin} onClick={onFinish}>
          { isLogin ? '发布评论' : '未登录请先登录' }
        </Button>
      </div>
    </div>
  );
};

export default observer(CommentEditor);