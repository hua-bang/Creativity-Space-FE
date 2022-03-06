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
          src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' 
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