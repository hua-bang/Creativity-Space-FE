import React, { useEffect, useState } from 'react';
import { getBookletListByUserId } from '@/api/booklet';
import { Booklet } from '@/typings/booklet';
import { User } from '@/typings/user';
import BookletItem from '@/components/Booklet-Item';

interface AuthorBookletListProps {
  author: User;
  userInfo?: User;
}

const AuthorBookletList: React.FC<AuthorBookletListProps> = ({
  author
}) => {
  const [bookletList, setBookletList] = useState<Booklet[]>([]);

  const loadBooklet = () => {
    getBookletListByUserId(author.id).then(res => {
      setBookletList(res.data);
    });
  };


  useEffect(() => {
    loadBooklet();
  }, []);

  return (
    <div>
      {
        bookletList.map(item => (
          <BookletItem key={item.id} booklet={item} />
        ))
      }
    </div>
  );
};

export default AuthorBookletList;