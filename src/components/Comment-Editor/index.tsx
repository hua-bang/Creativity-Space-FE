import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore';
import styles from './index.module.scss';
import { Avatar, Button, Input } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

interface CommentEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onFinish?: (value: string) => void; 
  withAvatar?: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = (props) => {
  
  const {
    onFinish,
    onChange,
    withAvatar = true,
    ...rest
  } = props;

  const { userStore } = useStore();

  const [currVal, setCurrVal] = useState(props.value);

  const isLogin = userStore.isLogin;

  const handleChange = (val: string) => {
    setCurrVal(val);
    onChange && onChange(val);
  };

  const handleClick = () => {
    onFinish && currVal && onFinish(currVal);
  };

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
          <Input.TextArea {...rest} onChange={handleChange} rows={3} placeholder="输入评论（Enter换行）" />
        </div>
      </div>      
      <div className={styles['comment-editor-btn-area']}>
        <Button type='primary' disabled={!isLogin} onClick={handleClick}>
          { isLogin ? '发布评论' : '未登录请先登录' }
        </Button>
      </div>
    </div>
  );
};

export default observer(CommentEditor);