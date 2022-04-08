import { Booklet } from '@/typings/booklet';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Button, Drawer, Empty, Table } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { BookletArticle } from '@/typings/booklet-article';
import MarkdownView from '@/components/Markdown-View';
import { getBookletArticleById } from '@/api/booklet';
import { useNavigate } from 'react-router-dom';

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
    title: '创建时间',
    dataIndex: 'create_time',
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
  const [bookletArticle, setBookletArticle] = useState<BookletArticle>();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const toEdit = (articleId: string) => {
    navigate(`/booklet/${booklet.id}/edit/${articleId}`);
  };

  const otherColumns = [
    {
      title: '操作',
      width: '200px',
      render: (col: unknown, record: BookletArticle) => (
        <div className={styles['operate-area']}>
          <Button onClick={() => { setBookletArticle({...record}); }} >查看</Button>
          <Button type='primary' onClick={() => toEdit(record.id)}>编辑</Button>
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
      <div className={styles['article-list-area']}>
        <Table data={booklet.articles} columns={columns} key="id" />
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
    </div>
  );
};

export default ArticleList;