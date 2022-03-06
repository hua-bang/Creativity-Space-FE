import React, { useState } from 'react';
import NavGroup from '../../../../components/Nav-Group';
import ContentCard from '../../../../components/Content-Card';
import styles from './index.module.scss';

const Content = () => {

  const [navKey, setNavKey] = useState<string>();

  const handleActiveKeyChange = (activeKey: string) => {
    setNavKey(activeKey);
  };

  return (
    <div>
      <NavGroup defaultValue={navKey} onChange={handleActiveKeyChange} menuList={['Relevant', 'Latest']} />    
      <div className={styles['content-list']}>
        {
          new Array(4).fill(1).map((item, index) => {
            return (
              <ContentCard key={index} expand={index === 0 ? true : false } />
            );
          })
        }
      </div>
    </div>
  );
};

export default Content;