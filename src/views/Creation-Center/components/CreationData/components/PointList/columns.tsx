import React from 'react';
import { Article } from '@/typings/article';
import { Button, TableColumnProps, Tag } from '@arco-design/web-react';
import styles from './index.module.scss';
import { POINT_STATUS_MAP, POINT_STATUS_MAP_KEY } from '@/const/point';
import { Point } from '@/typings/point';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import UserAvatarItem from '@/components/User-Avatar-item';

export const columns: ColumnProps<Point>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '用户',
    align: 'center',
    render(_, item) {
      return (
        <UserAvatarItem user={item.user} />
      );
    }
  },
  {
    title: '内容',
    dataIndex: 'content',
    align: 'center'
  },
  {
    title: '状态',
    align: 'center',
    render: (_, item) => {
      const status = POINT_STATUS_MAP[item.status as POINT_STATUS_MAP_KEY];
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
    title: '累计点赞数',
    dataIndex: 'like_count',
    align: 'center'
  },
  {
    title: '累计评论数',
    dataIndex: 'comment_count',
    align: 'center'
  }
];