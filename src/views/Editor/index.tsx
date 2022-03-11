import React, { useState } from 'react';
import MarkDownEditor from '../../components/MarkDown-Editor';
import styles from './index.module.scss';
import { Button, Dropdown, Card, Message } from '@arco-design/web-react';
import PublishForm, { ArticleFormProps } from './components/PublishForm';
import { createArticle } from '@/api/article';
import { ArticleTypeEnum } from '@/typings/article';

const Editor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleEditorChange: (val: string) => void = (val: string) => {
    setContent(val);
  };

  const uploadImg = async (files: File[]) => {
    return [
      {
        url: 'https://img1.baidu.com/it/u=1407750889,3441968730&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=799'
      }
    ];
  };

  const handleTitleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onSave = (article: ArticleFormProps) => {
    const addArticle = {
      ...article,
      title,
      content,
      type: ArticleTypeEnum.NORMAL
    };
    createArticle(addArticle).then(_ => {
      Message.success('新建成功');
    }).catch(err => {
      Message.warning(err.message);
    });
  };


  const dropComponent = (
    <Card title="发布文章" style={{ width: '500px', marginRight: '20px', background: 'white' }}>
      <PublishForm onSave={onSave} />
    </Card>
  );
  

  return (
    <>
      <div className={styles['nav-area']}>
        <div className={styles['nav-title-input']}>
          <input type="text" onInput={handleTitleInput} value={title} placeholder='输入文章标题...' />
        </div>
        <div className={styles['nav-btn-area']}>
          <span className={styles['tip']}>保存成功</span>
          <Button type="dashed">草稿箱</Button>
          <Dropdown droplist={dropComponent} position="bl" trigger="click" unmountOnExit={false}>
            <Button type="primary">发布</Button>
          </Dropdown>
        </div>
      </div>
      <MarkDownEditor
        value={content}
        uploadImages={uploadImg}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default Editor;