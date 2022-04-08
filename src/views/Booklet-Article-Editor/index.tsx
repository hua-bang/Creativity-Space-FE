import MarkDownEditor from '@/components/MarkDown-Editor';
import React, {  useEffect, useState } from 'react';
import styles from './index.module.scss';
import  { getBookletArticleById } from '@/api/booklet';
import { useParams, useNavigate } from 'react-router-dom';
import { BookletArticle } from '@/typings/booklet-article';
import { Message, Dropdown, Button, Card } from '@arco-design/web-react';
import useSessionStorageState from '@/hooks/useSessionStorage';
import dayjs from 'dayjs';
import useInterval from '@/hooks/useInterval';
import PublishForm, { ArticleForm } from './components/Publish-Form';
import { updateBookletArticle } from '@/api/booklet';

const BookletArticleEditor = () => {
  const [val, setVal] = useState('');
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState<BookletArticle>();

  const params = useParams();
  const articleId = params.articleId;
  const bookletId = params.bookletId;

  const navigate = useNavigate();

  const [saveTime, setSaveTime] = useState(dayjs());
  const [editorContent, setEditorContent] = useSessionStorageState(`booklet_article_editor_content_${articleId}`, {
    defaultValue: {
      title,
      content: val
    }
  });

  const handleSubmit = (data: ArticleForm) => {
    if (article) {
      const articleInfo = {
        ...data,
        content: val,
        booklet_id: article.booklet_id
      };
      updateBookletArticle(article.id, articleInfo).then(res => {
        Message.success('修改成功');
      }).catch((err) => {
        Message.warning(err.message);
      });
    }
  };

  const dropComponent = (
    <Card title="发布文章" style={{ width: '500px', marginRight: '20px', background: 'white' }}>
      <PublishForm title={title} article={article} onSubmit={handleSubmit} />
    </Card>
  );

  const loadArticle = (articleId: string) => {
    getBookletArticleById(articleId).then(res => {
      setArticle(res.data);
      setTitle(res.data.title);
      setVal(res.data.content);
    }).catch(() => {
      Message.warning('拉取文章失败。');
    });
  };

  const handleTitleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleContentChange = (value: string) => {
    setVal(value);
  };

  const toBooklet = () => {
    navigate(`/booklet/update/${bookletId}`);
  };

  useInterval(() => {
    if (title || val) {
      setEditorContent({ title, content: val });
      setSaveTime(dayjs());
    }
  }, 10000);

  useEffect(() => {
    articleId && loadArticle(articleId);
  }, [articleId]);

  return (
    <div className={styles['article-editor-wrapper']}>
      <div className={styles['article-editor-nav']}>
        <div className={styles['article-editor-nav-input']}>  
          <input type="text" onInput={handleTitleInput} value={title} placeholder='输入文章标题...' />
        </div>
        <div className={styles['article-operate-area']}>
          <span className={styles['tip']}>本地缓存成功： { saveTime.format('YYYY MM-DD HH:mm:ss') }</span>
          <Button onClick={toBooklet}>回到小册</Button>
          <Dropdown droplist={dropComponent} position="bl" trigger="click" unmountOnExit={false}>
            <Button type="primary">发布</Button>
          </Dropdown>
        </div>
      </div>
      <MarkDownEditor value={val} onChange={handleContentChange} />
    </div>
  );
};

export default BookletArticleEditor;