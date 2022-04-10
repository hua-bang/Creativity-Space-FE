import React, { useEffect, useState } from 'react';
import { getAuthors } from '@/api/common';
import { User } from '@/typings/user';
import { Message } from '@arco-design/web-react';
import styles from './index.module.scss';
import ChatUserItem from '@/components/Chat-User-Item';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

const ChatList = () => {

  const [authorArr, setAuthorArr] = useState<User[]>([]);

  const { userStore } = useStore();

  useEffect(() => {
    getAuthors().then(res => {
      setAuthorArr(res.data);
    }).catch(() => {
      Message.warning('获取作者列表失败。');
    });
  }, []);


  return (
    <>
      <div className={styles['author-title']}>ChatRoom</div>
      <div className={styles['author-list']}>
        {
          authorArr.map(item => ( <ChatUserItem canChat={!!userStore.userInfo} key={item.id} user={item} /> ))
        }
      </div>
    </>
  );
};

export default observer(ChatList);