import React from 'react';
import { Input } from '@arco-design/web-react';
import styles from './index.module.scss';
import { IconSearch } from '@arco-design/web-react/icon';

const SearchArea = () => {
  return (
    <div className={styles['search-area']}>
      <div className={styles['logo-area']}>
        <img 
          src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' 
        />
      </div>
      <div className={styles['input-area']}>
        <Input 
          style={{ maxWidth: '300px', height: '40px' }} 
          suffix={<IconSearch />}
        />
      </div>
    </div>
  );
};

export default SearchArea;