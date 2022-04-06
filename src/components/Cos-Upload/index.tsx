import React from 'react';
import { Upload, UploadProps } from '@arco-design/web-react';
import { BASE_URL } from '@/config/network';
import useToken from '@/hooks/useToken';
import { UploadItem } from '@arco-design/web-react/es/Upload';

interface CosUploadProps extends UploadProps {
  uploadMultiple?: boolean;
  onUploadSuccess?: (imgUrls: string[]) => void;
}

const CosUpload: React.FC<CosUploadProps> = (props) => {

  const { 
    onChange: customHandleChange,
    onUploadSuccess,
    ...rest
  } = props;

  const action = `${BASE_URL}/cos/user/upload`;

  const cosHandleChange = (fileList: UploadItem[], file: UploadItem) => {
    if (file.status === 'done') {
      const imgUrls = fileList.map(item => (
        item.response ? (item.response as any).data.url : item.url 
      ));
      onUploadSuccess && onUploadSuccess(imgUrls);
    }
  };

  const handleChange = (fileList: UploadItem[], file: UploadItem) => {
    customHandleChange && customHandleChange(fileList, file);
    cosHandleChange(fileList, file);
  };


  const [token] = useToken();

  return (
    <Upload 
      name='file'
      action={action}
      headers={{
        Authorization: `Bearer ${token}`
      }}
      {...rest}
      onChange={handleChange}
    />
  );
};

export default CosUpload;