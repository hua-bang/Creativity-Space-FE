import React from 'react';
import { Input } from 'antd';

const SearchArea = () => {
  return (
    <div className='search-area'>
      <div className='logo-area'>
        <img style={{ width: '50px' }} src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' />
      </div>
      <div className='input-area'>
        <Input style={{ maxWidth: '400px' }} />
      </div>
    </div>
  );
};

export default SearchArea;