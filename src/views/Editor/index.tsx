import React, { useEffect, useState } from 'react';
import MarkDownEditor from '../../components/MarkDown-Editor';
import styles from './index.module.scss';
import { Button, Dropdown, Card, Message, Modal } from '@arco-design/web-react';
import PublishForm, { ArticleFormProps } from './components/PublishForm';
import { createArticle, getArticleById, uploadArticleImg, updateArticle } from '@/api/article';
import { Article, ArticleTypeEnum, UpdateArticleType } from '@/typings/article';
import { useNavigate } from 'react-router-dom';
import useInterval from '@/hooks/useInterval';
import useSessionStorageState from '@/hooks/useSessionStorage';
import dayjs from 'dayjs';
import { getDraftById, upsertDraft } from '@/api/draft';
import { DraftTypeEnum, UpsertDraftType } from '@/typings/draft';
import useSearchParamByKey from '@/hooks/useSearchParamByKey';

const Editor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useSessionStorageState('article_editor_content', {
    defaultValue: {
      title,
      content
    }
  });
  const [saveTime, setSaveTime] = useState(dayjs());
  const [article, setArticle] = useState<Article>();
  const [draft, setDraft] = useState<UpsertDraftType>();
  const draftId = useSearchParamByKey('draftId');
  const articleId = useSearchParamByKey('articleId');

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

  const saveDraft = () => {
    const newDraft: UpsertDraftType = {
      ...draft,
      title,
      type: DraftTypeEnum.ARTICLE,
      content
    };

    upsertDraft(newDraft).then(res => {
      Message.success('保存成功');
      setDraft(res.data);
    });
  };

  const addArticle = (article: ArticleFormProps) => {
    const addArticle = {
      ...article,
      title,
      content,
      type: ArticleTypeEnum.NORMAL
    };
    createArticle(addArticle).then(res => {
      const { id }  = res.data;
      setEditorContent({ title: '', content: '' });
      Message.success('新建成功,爲你跳轉文章詳情頁。');
      setTimeout(() => {
        navigate(`/article/${id}`);
      }, 1000);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const update = (articleVal: ArticleFormProps) => {
    const addArticle = {
      ...article,
      ...articleVal,
      title,
      content
    };
    updateArticle(addArticle as UpdateArticleType).then(res => {
      const { id }  = res.data;
      setEditorContent({ title: '', content: '' });
      Message.success('新建成功,爲你跳轉文章詳情頁。');
      setTimeout(() => {
        navigate(`/article/${id}`);
      }, 1000);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const onSave = (article: ArticleFormProps) => {
    if (!articleId) {
      addArticle(article);
    } else {
      update(article);
    }
  };

  const dropComponent = (
    <Card title="发布文章" style={{ width: '500px', marginRight: '20px', background: 'white' }}>
      <PublishForm onSave={onSave} article={article} />
    </Card>
  );

  useInterval(() => {
    if (title || content) {
      setEditorContent({ title, content });
      setSaveTime(dayjs());
    }
  }, 10000);

  const loadDraft = (id: string) => {
    getDraftById(id).then(res => {
      setDraft(res.data);
      const { title, content } = res.data;
      setTitle(title);
      setContent(content);
    }).catch(err => {
      Message.warning('拉取草稿信息有误。');
    });
  };

  const loadArticle = (id: string) => {
    getArticleById(id).then(res => {
      const { content, title }= res.data;
      setContent(content);
      setTitle(title);
      setArticle(res.data);
    }).catch(() => {
      Message.warning('拉取失败。');
    });
  };

  const load = () => {
    if (articleId) {
      loadArticle(articleId);
    } else if (draftId) {
      loadDraft(draftId);     
    } else if (editorContent?.content) {
      Modal.confirm({
        title: '缓存提示',
        content: '检测到有文章缓存，是否恢复',
        onOk() {
          const { content, title } = editorContent;
          setContent(content);
          setTitle(title);
        }
      });
    }
  };

  useEffect(() => {
    load();
  }, []);
  
  return (
    <>
      <div className={styles['nav-area']}>
        <div className={styles['nav-title-input']}>
          <input type="text" onInput={handleTitleInput} value={title} placeholder='输入文章标题...' />
        </div>
        <div className={styles['nav-btn-area']}>
          <span className={styles['tip']}>本地缓存成功： { saveTime.format('YYYY MM-DD HH:mm:ss') }</span>
          <Button type="dashed" onClick={saveDraft}>保存草稿箱</Button>
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