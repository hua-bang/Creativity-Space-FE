import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Table, Form, Input, Button, Message, Drawer } from '@arco-design/web-react';
import { columns as defaultColumns } from './columns';
import ProTable from '@/components/Pro-Table';
import { formColumns } from './form';
import { queryDraftList } from '@/api/draft';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { Draft, QueryDraft } from '@/typings/draft';
import MarkDownView from '@/components/Markdown-View';

interface DraftListProps {
  showTitle?: boolean;
  searchParams?: Record<string, any>;
}

const DraftList: React.FC<DraftListProps> = ({
  showTitle = true,
  searchParams = {}
}) => {
  
  const [data, setData] = useState<Draft[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectDraft, setSelectDraft] = useState<Draft>();

  const handleDataChange = (data: Draft[]) => {
    setData(data);
  };

  const showDraft = (draft: Draft) => {
    setSelectDraft(draft);
  };

  useEffect(() => {
    selectDraft && setVisible(true);
  }, [selectDraft]);

  const toUpdateDetail = (id: string) => {
    window.open(`/editor?draftId=${id}`);
  };

  const operateColumns: ColumnProps<Draft>[] = [
    {
      title: '操作',
      align: 'center',
      width: 400,
      render: (col, record, index) => {
        return (
          <div className={styles['btn-area']}>
            <Button onClick={() => showDraft(record)} >查看内容</Button>
            <Button type='primary' onClick={() => toUpdateDetail(record.id)} >继续写</Button>
          </div>
        );
      }
    }
  ];

  const columns = [...defaultColumns, ...operateColumns];

  return (
    <div className={styles['user-list-page']}>
      { showTitle && (<h3>动态列表</h3>) }
      <ProTable<Draft, QueryDraft>
        columns={columns}
        requestFn={queryDraftList}
        formColumns={formColumns}
        data={data}
        defaultParams={searchParams}
        onDataChange={handleDataChange}
      />
      <Drawer
        visible={visible}
        width="600px"
        onCancel={() => setVisible(false)}
        title={selectDraft?.title ?? '内容'}
        footer={null}
      >
        { 
          selectDraft ? (
            <MarkDownView value={selectDraft.content} />
          ) : '暂无' 
        }
      </Drawer>
    </div>
  );
};

export default DraftList;