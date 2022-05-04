import React, { useEffect, useState } from 'react';
import { getBookletDetail } from '@/api/booklet';
import { Booklet } from '@/typings/booklet';
import BookletItem from '../Booklet-Item';
import { Button, Empty } from '@arco-design/web-react';
import styles from './index.module.scss';

interface ChatBookletProps {
  bookletId: string;
}

const ChatBooklet = (props: ChatBookletProps) => {
  const { bookletId } = props;

  const [booklet, setBooklet] = useState<Booklet>();

  const loadBooklet = (bookletId: string) => {
    getBookletDetail(bookletId).then(res => {
      setBooklet(res.data);
    }).catch(err => console.warn);
  };

  useEffect(() => {
    loadBooklet(bookletId);
  }, [bookletId]);

  return (
    <div className={styles['chat-booklet-wrapper']}>
      {
        booklet ? (
          <BookletItem showUserDetail={false} booklet={booklet} />
        ) : (
          <Empty
            imgSrc='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
            description={<Button type='primary'>无小册信息</Button>}
          />
        )
      }
      
    </div>
  );
};

export default ChatBooklet;