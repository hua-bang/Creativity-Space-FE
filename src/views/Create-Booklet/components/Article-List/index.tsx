import { Booklet } from '@/typings/booklet';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button, Drawer, Empty, Message, Modal, Table } from '@arco-design/web-react';
import { BookArticleStatusMapForAuthor } from '@/const/booklet-article';
import { BookletArticle, BookletArticleStatusEnum } from '@/typings/booklet-article';
import MarkdownView from '@/components/Markdown-View';
import { getBookletArticleById, deleteBookletArticle } from '@/api/booklet';
import { useNavigate } from 'react-router-dom';
import AddArticle from '../Add-Article';

const defaultColumns = [
  {
    title: '章节名',
    dataIndex: 'title',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
  },
  {
    title: '状态',
    render(col: unknown, record: BookletArticle, index: number) {
      return (
        <div>{BookArticleStatusMapForAuthor[record.status]}</div>
      );
    }
  },
  {
    title: 'order',
    dataIndex: 'order'
  }
];

interface ArticleListProps {
  booklet: Booklet;
}

const ArticleList: React.FC<ArticleListProps> = ({
  booklet
}) => {

  const [visible, setVisible] = useState(false);
  const [addArticleVisible, setAddArticleVisible] = useState(false);
  const [bookletArticle, setBookletArticle] = useState<BookletArticle>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const toEdit = (articleId: string) => {
    navigate(`/booklet/${booklet.id}/edit/${articleId}`);
  };

  const deleteArticle = (articleId: string) => {
    deleteBookletArticle(booklet.id, articleId).then(res => {
      Message.success('删除成功');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const otherColumns = [
    {
      title: '操作',
      width: '280px',
      render: (col: unknown, record: BookletArticle) => (
        <div className={styles['operate-area']}>
          <Button onClick={() => { setBookletArticle({...record}); }} >查看</Button>
          <Button type='primary' onClick={() => toEdit(record.id)}>编辑</Button>
          <Button status='danger' type='secondary' onClick={() => deleteArticle(record.id)}>删除</Button>
        </div>
      )
    }
  ];

  const columns = [...defaultColumns, ...otherColumns];

  const loadContent = (id: string) => {
    getBookletArticleById(id).then(res => {
      setContent(res.data.content);
    });
  };

  useEffect(() => {
    if (bookletArticle) {
      setVisible(true);
      loadContent(bookletArticle.id);
    }
  }, [bookletArticle]);

  return (
    <div className={styles['article-list-wrapper']}>
      <div className={styles['article-list-title']}>
        小册文章
      </div>
      <div className={styles['article-btn-area']}>
        <Button type="primary" onClick={() => setAddArticleVisible(true)}>新增</Button>
      </div>
      <div className={styles['article-list-area']}>
        <Table 
          data={booklet.articles.filter(item => item.status !== BookletArticleStatusEnum.DELETED)} 
          columns={columns} 
          key="id" 
        />
      </div>
      <Drawer 
        footer={null} 
        width="50%" 
        visible={visible} 
        onCancel={() => setVisible(false)} 
        title={bookletArticle?.title ?? ''}
      >
        {
          content ? (
            <div style={{ padding: '10px' }}>
              <MarkdownView value={content} />
            </div>
          ) : <Empty />
        }
      </Drawer>
      <Modal
        title='新增文章'
        visible={addArticleVisible}
        onOk={() => setAddArticleVisible(false)}
        onCancel={() => setAddArticleVisible(false)}
        autoFocus={false}
        focusLock={true}
        footer={null}
      >
        <AddArticle />
      </Modal>
    </div>
  );
};

export default ArticleList;