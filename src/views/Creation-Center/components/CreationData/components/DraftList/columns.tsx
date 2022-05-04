import React from 'react';
import { Article } from '@/typings/article';
import { Button, TableColumnProps, Tag, Image } from '@arco-design/web-react';
import styles from './index.module.scss';
import { Draft } from '@/typings/draft';
export const columns: TableColumnProps<Draft>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'title',
    align: 'center'
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
];