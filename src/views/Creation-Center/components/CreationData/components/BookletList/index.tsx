import { deleteBookletById, queryBookletList } from '@/api/booklet';
import { BOOKLET_STATUS_MAP, BOOKLET_STATUS_MAP_KEY } from '@/const/booklet';
import { Booklet, BookletStatusEnum, QueryBookletDto } from '@/typings/booklet';
import { Form, PaginationProps, Table, Input, Button, Select, Message } from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import React, { useEffect, useState } from 'react';
import { columns as defaultColumn } from './columns';
import styles from './index.module.scss';
import useStore  from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { applyBookletAuthor } from '@/api/user';


interface BookletListProps {
  showTitle?: boolean;
  searchParams?: Record<string, any>;
}

const defaultParams = {
  page: 1,
  pageSize: 10,
};

const FormItem = Form.Item;
const Option = Select.Option;

const BookletList: React.FC<BookletListProps> = ({
  showTitle = true,
  searchParams = {}
}) => {

  const [booklets, setBooklets] = useState<Booklet[]>([]);
  const [params, setParams] = useState<QueryBookletDto>({...defaultParams, ...searchParams});
  const [total, setTotal] = useState<number>(0);

  const [form] = Form.useForm();

  const loadData = (params: QueryBookletDto) => {
    queryBookletList(params).then((res) => {
      const {list, pagination} = res.data;
      setBooklets(list);
      setTotal(pagination.total);
    });
  };

  const { userStore } = useStore();
  const { userInfo } = userStore;

  const handleChange = (pagination: PaginationProps) => {
    const { current = 1 } = pagination;
    setParams(prev => ({
      ...prev,
      page: current,
    }));
  };

  const handleSubmit = (data: Partial<QueryBookletDto>) => {
    setParams(prev => ({
      ...prev,
      ...data,
      page: 1
    }));
  };

  useEffect(() => {
    loadData(params);
  }, [params]);

  const toBookletDetail = (id: string) => {
    window.open(`/booklet/detail/${id}`);
  };

  const updateBooklet = (id: string) => {
    window.open(`/booklet/update/${id}`);
  };

  const delBooklet = (booklet: Booklet, index: number) => {
    deleteBookletById(booklet.id).then(() => {
      Message.success('删除成功');
      booklets[index].status = BookletStatusEnum.REJECTED;
      setBooklets(prev => [...prev]);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const operateColumns: ColumnProps<Booklet>[] = [
    {
      title: '操作',
      align: 'center',
      width: 340,
      render: (col: unknown, record: Booklet, index) => {
        return (
          <div className={styles['btn-area']}>
            { 
              record.status === BookletStatusEnum.NORMAL && (
                <Button onClick={() => toBookletDetail(record.id)}>详情</Button>
              ) 
            }
            {
              record.status !== BookletStatusEnum.REJECTED && (
                <>
                  <Button type="primary" onClick={() => updateBooklet(record.id)}>修改</Button>
                  <Button type="primary" status='danger' onClick={() => delBooklet(record, index)}>删除</Button>
                </>
              )  
            }
          </div>
        );
      }
    }
  ];

  const columns = [...defaultColumn, ...operateColumns];

  const reset = () => {
    setParams({...defaultParams, ...searchParams});
    form.resetFields();
  };

  const applyAuthor = () => {
    applyBookletAuthor().then(() => {
      Message.success('申请成功，待审核');
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  return (
    <div>
      { showTitle && (<h3>小册列表</h3>) }
      {
        userInfo && Number(userInfo.is_booklet_author) !== 1 && (
          <Button disabled={Number(userInfo.is_booklet_author) === 2} type="primary" onClick={applyAuthor}>
            {Number(userInfo.is_booklet_author) === -1 && '审核不通过，请重新申请'}
            {Number(userInfo.is_booklet_author) === 2 && '审核中，请等待'}
            {Number(userInfo.is_booklet_author) === 0 && '申请成为小册作者'}
          </Button>
        )
      }
      <div style={{ padding: '5px' }}>
        <Form form={form} layout='inline' onSubmit={handleSubmit}>
          <FormItem label='小册名称' field='name'>
            <Input style={{ width: 270 }} placeholder='请输入小册名称' />
          </FormItem>
          <FormItem label='描述' field='description'>
            <Input style={{ width: 270 }} placeholder='请输入描述' />
          </FormItem>
          <FormItem label='状态' field='status'>
            <Select>
              { 
                Object.keys(BOOKLET_STATUS_MAP).map(key => (
                  <Option key={key} value={Number(key)}>
                    { BOOKLET_STATUS_MAP[key as BOOKLET_STATUS_MAP_KEY].value }
                  </Option>
                )) 
              }
            </Select>
          </FormItem>
          <FormItem>
            <Button style={{ marginRight: '10px' }} type='primary' htmlType='submit'>搜索</Button>
            <Button onClick={() => reset()} >重置</Button>
          </FormItem>
        </Form>
      </div>
      <Table
        onChange={handleChange}
        rowKey='id' 
        columns={columns} 
        data={booklets}
        pagination={{ total, current: params.page, pageSize: params.pageSize }}
      />
    </div>
  );
};

export default observer(BookletList);