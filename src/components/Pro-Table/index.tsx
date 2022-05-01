import React, { ReactElement, useEffect, useState } from 'react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { Button, Form, Input, Message, PaginationProps, Select, Table } from '@arco-design/web-react';
import { AxiosResponse } from 'axios';

interface FormColumnType {
  id: string;
  render: () => ReactElement;
}

type ParamsProps = {
  page: number;
  pageSize: number;
  [key: string]: any;
};

interface ResponseData<T> {
  list: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  }
}

interface ProTableProps<
  T, 
  ParamsData extends ParamsProps,
  FormData = Partial<ParamsData>,
> {
  columns: ColumnProps<T>[];
  customToolsArea?: ReactElement;
  formColumns?: Array<FormColumnType>;
  requestFn?: (params: ParamsData) => Promise<AxiosResponse<ResponseData<T>>>;
  onFormChange?: (data: FormData) => void;
  rowKey?: string;
  data?: T[];
  onDataChange?: (data: T[]) => void;
  defaultParams?: Partial<ParamsData>;
}

const initParams = {
  page: 1,
  pageSize: 5,
};

const FormItem = Form.Item;

function ProTable<
  T extends Record<string, any> = Record<string, any>, 
  ParamsData extends ParamsProps = ParamsProps,
  FormData = Partial<ParamsData>,
> (props: ProTableProps<T, ParamsData>) {

  const {
    rowKey = 'id',
    columns, 
    formColumns,
    onFormChange,
    requestFn,
    data = [],
    onDataChange,
    customToolsArea,
    defaultParams
  } = props;

  const [params, setParams] = useState<ParamsData>({
    ...initParams,
    ...defaultParams
  } as unknown as ParamsData);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormData>();
  const [isMounted, setIsMounted] = useState(false); 

  const handleChange = (pagination: PaginationProps) => {
    const { current = 1 } = pagination;
    setParams(prev => ({
      ...prev,
      page: current,
    }));
  };
  
  const handleSubmit = (data: FormData) => {
    setParams(prev => ({
      ...prev,
      ...data,
      page: 1
    }));
    onFormChange && onFormChange(data);
  };

  const request = (params: ParamsData) => {
    if (requestFn) {
      setLoading(true);
      requestFn(params)
        .then(res => {
          const { list, pagination } = res.data;
          onDataChange && onDataChange(list);
          setTotal(pagination.total);
        }).catch(err => {
          Message.warning(err.message);
        }).finally(() => {
          setLoading(false);
        });
    }
  };

  const reset = () => {
    setParams({...defaultParams} as unknown as ParamsData);
    form.resetFields();
  };

  useEffect(() => {
    request(params);
  }, [params]);

  useEffect(() => {
    if (isMounted) {
      if (defaultParams) {
        setParams(prev => ({
          ...prev,
          ...defaultParams
        }));
      }
    } else {
      setIsMounted(true);
    }
  }, [defaultParams]);

  return (
    <div>
      <div style={{ padding: '5px' }}>
        {
          formColumns && (
            <Form<FormData> form={form} layout='inline' onSubmit={handleSubmit}>
              {
                formColumns.map(item => (
                  <React.Fragment key={item.id}>
                    {item.render()}
                  </React.Fragment>
                ))
              }
              <FormItem>
                <Button type='primary' style={{ marginRight:'10px' }} htmlType='submit'>搜索</Button>
                <Button onClick={reset}>重置</Button>
              </FormItem>
            </Form>
          )
        }
      </div>
      { 
        customToolsArea && (
          <div style={{ paddingBottom: '10px' }}>
            {customToolsArea}
          </div>
        )
      }
      <Table<T>
        loading={loading}
        onChange={handleChange}
        rowKey={rowKey} 
        data={data}
        columns={columns} 
        pagination={{ total, current: params.page, pageSize: params.pageSize }}
      />
    </div>
  );
}

export default ProTable;