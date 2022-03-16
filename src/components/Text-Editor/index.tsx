import React from 'react';
import styles from './index.module.scss';
import { Input, Upload, Modal, Button } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import IconTip from '@/components/Icon-Tip';
import { IconImage, IconLink, IconPushpin } from '@arco-design/web-react/icon';

interface TextEditorProps {
  value?: string;
  imgArr?: string[];
  onChange?: (value: string, images: Array<string>) => void;
  onFinish?: (value: string, images: Array<string>, tag?: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  imgArr,
  onChange,
  onFinish
}) => {

  const fileList: UploadItem[] = [];

  const handleTextAreaChange = (val: string) => {
    onChange && onChange(val || '', []);
  };

  const handleImageIconClick = () => {
    console.log('click');
  };

  const handleSubmit = () => {
    onFinish && onFinish(value || '', []);
  };

  return (
    <div className={styles['text-editor-wrapper']}>
      <Input.TextArea 
        value={value} 
        onChange={handleTextAreaChange} 
        rows={3} 
        maxLength={1000} 
        showWordLimit 
        placeholder='快来分享你的新鲜事吧！' 
      />
      {
        (fileList.length > 0) &&
        (
          <div className={styles['text-editor-img-area']}>
            <Upload
              multiple
              action='/'
              fileList={fileList}
              listType='picture-card'
              onPreview={file => {
                Modal.info({
                  title: '预览',
                  content: <div style={{textAlign: 'center'}}>
                    <img style={{maxWidth: '100%'}} src={file.url} />
                  </div>
                });
              }}
            />
          </div>
        )
      }
      <div className={styles['text-btn-area']}>
        <div className={styles['text-icon-area']}>
          <IconTip icon={<IconImage />} text="图片" onClick={handleImageIconClick} />
          <IconTip icon={<IconLink />} text="链接" />
          <IconTip icon={<IconPushpin />} text="话题" />
        </div>
        <div className={styles['text-publish-btn-area']}>
          <Button disabled={!value} onClick={handleSubmit} style={{ width: '80px' }} type="primary">发布</Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;