import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Table, Form, Input, Button, Message } from '@arco-design/web-react';
import { columns as defaultColumns } from './columns';
import { Point, PointStatusEnum } from '@/typings/point';
import ProTable from '@/components/Pro-Table';
import { formColumns } from './form';
import { QueryPointDto } from '@/typings/point';
import { queryPoint } from '@/api/point';
import { ColumnProps } from '@arco-design/web-react/es/Table';

interface PointListProps {
  showTitle?: boolean;
  searchParams?: Record<string, any>;
}

const PointList: React.FC<PointListProps> = ({
  showTitle = true,
  searchParams = {}
}) => {
  
  const [data, setData] = useState<Point[]>([]);
  const handleDataChange = (data: Point[]) => {
    setData(data);
  };

  const toPointDetail = (id: string) => {
    window.open(`/point/${id}`);
  };

  const operateColumns: ColumnProps<Point>[] = [
    {
      title: '操作',
      align: 'center',
      width: 400,
      render: (col, record, index) => {
        return (
          <div className={styles['btn-area']}>
            <Button onClick={() => toPointDetail(record.id)} >详情</Button>
            {/* <Button type='primary' onClick={() => audit(record.id, PointStatusEnum.AUDITED, index)}>审核通过</Button>
            <Button type='primary' status='danger' onClick={() => audit(record.id, PointStatusEnum.FORBIDDEN, index)}>审核不通过</Button> */}
          </div>
        );
      }
    }
  ];

  const columns = [...defaultColumns, ...operateColumns];

  return (
    <div className={styles['user-list-page']}>
      { showTitle && (<h3>动态列表</h3>) }
      <ProTable<Point, QueryPointDto>
        columns={columns}
        requestFn={queryPoint}
        formColumns={formColumns}
        data={data}
        defaultParams={searchParams}
        onDataChange={handleDataChange}
      />
    </div>
  );
};

export default PointList;