import React, { useEffect, useState } from 'react';
import NavGroup from '@/components/Nav-Group';
import { getBookletList } from '@/api/booklet';
import { Booklet } from '@/typings/booklet';
import BookletItem from '@/components/Booklet-Item';
import styles from './index.module.scss';

const BookletList = () => {
  const [navKey, setNavKey] = useState<string>();
  const [bookletList, setBookletList] = useState<Booklet[]>([]);

  const handleActiveKeyChange = (activeKey: string) => {
    setNavKey(activeKey);
  };

  const load = () => {
    getBookletList().then(res => {
      setBookletList(res.data.list);
    });
  };

  useEffect(() => {
    load();
  }, []);
  
  return (
    <div>
      <NavGroup defaultValue={navKey} onChange={handleActiveKeyChange} menuList={['All']} />
      <div className={styles['booklet-container']}>
        { 
          bookletList.map(item => (<BookletItem key={item.id} booklet={item} />))
        }
      </div>
    </div>
  );
};

export default BookletList;