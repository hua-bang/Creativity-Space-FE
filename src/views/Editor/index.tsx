import React, { useState } from 'react';
import MarkDownEditor from '../../components/MarkDown-Editor';
import styles from './index.module.scss';
import { Button, Dropdown, Card, Message } from '@arco-design/web-react';
import PublishForm, { ArticleFormProps } from './components/PublishForm';
import { createArticle, uploadArticleImg } from '@/api/article';
import { ArticleTypeEnum } from '@/typings/article';
import { useNavigate } from 'react-router-dom';

const Editor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const handleEditorChange: (val: string) => void = (val: string) => {
    setContent(val);
  };

  const uploadImg = async (files: File[]) => {
    try {
      const res = await uploadArticleImg(files[0]);
      const { url } = res.data;
      return [{ url }];
    } catch(err) {
      Message.warning('图片上传失败，请稍后再试。');
    }
    return [];
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
    createArticle(addArticle).then(res => {
      const { id }  = res.data;
      Message.success('新建成功,爲你跳轉文章詳情頁。');
      setTimeout(() => {
        navigate(`/article/${id}`);
      }, 1000);
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