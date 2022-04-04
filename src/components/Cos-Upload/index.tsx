import React from 'react';
import { Upload, UploadProps } from '@arco-design/web-react';
import { BASE_URL } from '@/config/network';
import useToken from '@/hooks/useToken';

interface CosUploadProps extends UploadProps {
  uploadMultiple?: boolean;  
}

const CosUpload: React.FC<CosUploadProps> = (props) => {

  const action = `${BASE_URL}/cos/user/upload`;

  const [token] = useToken();

  return (
    <Upload 
      name='file'
      action={action}
      headers={{
        Authorization: `Bearer ${token}`
      }}
      {...props}  
    />
  );
};

export default CosUpload;