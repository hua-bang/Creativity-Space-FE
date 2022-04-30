import React, { useEffect, useState } from 'react';
import { getBookletListByUserId } from '@/api/booklet';
import { Booklet } from '@/typings/booklet';
import { User } from '@/typings/user';
import BookletItem from '@/components/Booklet-Item';
import { Button, Empty } from '@arco-design/web-react';
import useStore from '@/hooks/useStore';

interface AuthorBookletListProps {
  author: User;
  userInfo?: User;
}

const AuthorBookletList: React.FC<AuthorBookletListProps> = ({
  author
}) => {

  const { userStore } = useStore();
  const [bookletList, setBookletList] = useState<Booklet[]>([]);

  const loadBooklet = () => {
    getBookletListByUserId(author.id).then(res => {
      setBookletList(res.data);
    });
  };

  const description = userStore.userInfo?.id === author.id 
    ? (<Button type='primary'>申请成为小册作者</Button>)
    : "暂无数据";

  useEffect(() => {
    loadBooklet();
  }, [author]);

  return (
    <div style={{ padding: '20px 0' }}>
      {
        bookletList.length > 0 
          ? (
            bookletList.map(item => (
              <BookletItem key={item.id} booklet={item} />
            ))
          ) : (
            <Empty
              imgSrc='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
              description={description}
            />
          )
      }
    </div>
  );
};

export default AuthorBookletList;