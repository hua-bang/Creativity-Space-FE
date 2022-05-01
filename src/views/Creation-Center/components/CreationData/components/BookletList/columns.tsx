import React from 'react';
import { Article } from '@/typings/article';
import { Button, TableColumnProps, Tag, Image } from '@arco-design/web-react';
import { ARTICLE_STATUS_MAP_KEY, ARTICLE_STATUS_MAP } from '@/const/article';
import styles from './index.module.scss';
import { Booklet, BookletStatusEnum } from '@/typings/booklet';
import { BOOKLET_STATUS_MAP, BOOKLET_STATUS_MAP_KEY } from '@/const/booklet';
import UserAvatarItem from '@/components/User-Avatar-item';
export const columns: TableColumnProps<Booklet>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '用户',
    render: (_, item) => {
      return (
        <UserAvatarItem user={item.user} />
      );
    }
  },
  {
    title: '小册名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'center'
  },
  {
    title: '状态',
    align: 'center',
    render: (_, item) => {
      const status = BOOKLET_STATUS_MAP[item.status as BOOKLET_STATUS_MAP_KEY];
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
    title: '封面图',
    align: 'center',
    render(col: unknown, record) {
      return (
        <Image width={'100px'} src={record.cover_url} />
      );
    }
  }
];