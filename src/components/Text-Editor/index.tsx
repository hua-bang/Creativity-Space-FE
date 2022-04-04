import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Input, Modal, Button, Popover, Message, Empty } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import IconTip from '@/components/Icon-Tip';
import { IconImage, IconPushpin } from '@arco-design/web-react/icon';
import CosUpload from '@/components/Cos-Upload';
import { getPointTag } from '@/api/point';
import { Tag } from '@/typings/tag';

interface TextEditorProps {
  value?: string;
  imgArr?: string[];
  onChange?: (value: string, images: Array<string>) => void;
  onFinish?: (value: string, images: Array<string>, tag: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  onFinish
}) => {

  const [tag, setTag] = useState<Tag>();
  const [fileList, setFileList] = useState<UploadItem[]>([]);
  const [tagList, setTagList] = useState<Tag[]>([]);

  const handleTextAreaChange = (val: string) => {
    onChange && onChange(val || '', []);
  };

  const handleImageIconClick = () => {
    console.log('click');
  };

  const handleUploadChange = (fileList: UploadItem[]) => {
    setFileList(fileList);
  };

  const handleSubmit = () => {
    if (!tag) return;
    const imgArr = fileList.filter(file => !!(file.response as any).data.url).
      map(item => (item.response as any).data.url);
    onFinish && onFinish(value || '', imgArr as string[], tag.id);
  };

  const selectTag = (tag: Tag)  => {
    setTag(tag);
  };

  const loadPointTag = () => {
    getPointTag().then(res => {
      setTagList(res.data);
    }).catch(err => {
      Message.warning('拉取列表失败。');
    });
  };

  useEffect(() => {
    loadPointTag();
  }, []);

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
            <CosUpload
              multiple
              onChange={handleUploadChange}
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
          <div className={styles['text-icon-item']}>
            <CosUpload limit={3} showUploadList={false} multiple={true} onChange={handleUploadChange}>
              <IconTip icon={<IconImage />} text="图片" onClick={handleImageIconClick} />
            </CosUpload>
          </div>
          {/* <IconTip icon={<IconLink />} text="链接" /> */}
          <Popover
            trigger='hover'
            position='bottom'
            title='话题列表'
            content={
              tagList.length > 0 ?
                (
                  <span>
                    {
                      tagList.map(tag => (
                        <p onClick={() => selectTag(tag)} className={styles['tag-item']} key={tag.id}>#{tag.name}#</p>
                      ))
                    }
                  </span>
                ) : <Empty />
            }
          >
            <span>
              <IconTip 
                icon={<IconPushpin />} 
                text={
                  <>
                    话题 
                    {tag ? <> :<span className={styles['select-tag']}>#{tag.name}#</span></> : '' }
                  </>
                } 
              />
            </span>
          </Popover>
        </div>
        <div className={styles['text-publish-btn-area']}>
          <Button disabled={!value} onClick={handleSubmit} style={{ width: '80px' }} type="primary">发布</Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;