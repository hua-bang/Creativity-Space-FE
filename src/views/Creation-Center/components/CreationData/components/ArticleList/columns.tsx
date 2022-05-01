import React from 'react';
import { Article } from '@/typings/article';
import { Button, TableColumnProps, Tag } from '@arco-design/web-react';
import { ARTICLE_STATUS_MAP_KEY, ARTICLE_STATUS_MAP } from '@/const/article';
import styles from './index.module.scss';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import UserAvatarItem from '@/components/User-Avatar-item';


const toArticleDetail = (id: string) => {
  window.open(`/article/${id}`);
};

export const columns: ColumnProps<Article>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '用户',
    render(col: unknown, record) {
      return (
        <UserAvatarItem user={record.user!} />
      );
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    render(col, record) {
      return (
        <span className={styles['title-wrapper']} onClick={() => record.status === 1 && toArticleDetail(record.id)}>
          {record.title}
        </span>
      );
    }
  },
  {
    title: '状态',
    align: 'center',
    render: (_, item) => {
      const status = ARTICLE_STATUS_MAP[item.status as ARTICLE_STATUS_MAP_KEY];
      return (
        <Tag color={status.color}>{status.value}</Tag>
      );
    }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    align: 'center',
  }, 
  {
    title: '修改时间',
    dataIndex: 'update_time',
    align: 'center'
  }, 
  {
    title: '累计点赞数',
    dataIndex: 'like_count',
    align: 'center'
  },
  {
    title: '累计评论数',
    dataIndex: 'comment_count',
    align: 'center'
  },
  {
    title: '累计收藏数',
    align: 'center',
    dataIndex: 'collect_count'
  }
];