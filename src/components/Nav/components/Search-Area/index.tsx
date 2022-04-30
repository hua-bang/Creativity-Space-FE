import React, { useState } from 'react';
import { Input } from '@arco-design/web-react';
import styles from './index.module.scss';
import { IconSearch } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';


const SearchArea = () => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');

  const handleInputChange = (value: string) => {
    setKeyword(value);
  };

  const toSearchPage = () => {
    if (keyword) {
      navigate(`/search?q=${keyword}`);
    }
  };

  const toHomePage = () => {
    navigate('/home/content');
  };
  
  return (
    <div className={styles['search-area']}>
      <div className={styles['logo-area']} onClick={toHomePage}>
        <img 
          src='https://cos-1258926018.cos.ap-guangzhou.myqcloud.com/common-file%2F%E6%AF%95%E8%AE%BE-Logo.drawio%20(1).png' 
        />
      </div>
      <div className={styles['input-area']}>
        <Input 
          value={keyword}
          style={{ maxWidth: '300px', height: '40px' }} 
          suffix={(
            <span onClick={toSearchPage}>
              <IconSearch/>
            </span>
          )}
          onChange={handleInputChange}
          onPressEnter={toSearchPage}
        />
      </div>
    </div>
  );
};

export default SearchArea;