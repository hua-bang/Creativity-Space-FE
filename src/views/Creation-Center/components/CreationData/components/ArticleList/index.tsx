import React, { useEffect, useState } from 'react';
import { Button, Table, Drawer, Empty, Message, PaginationProps, Form, Input, Select, Modal } from '@arco-design/web-react';
import { columns as defaultColumns } from './columns';
import styles from './index.module.scss';
import { Article, ArticleStatusEnum, QueryArticleDto } from '@/typings/article';
import { getArticleDetailById, queryArticleList, deleteArticle } from '@/api/article';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import MarkdownView from '@/components/Markdown-View';
import { ARTICLE_STATUS_MAP, ARTICLE_STATUS_MAP_KEY } from '@/const/article';

interface ArticleListProps {
  showTitle?: boolean;
  searchParams?: Record<string, any>;
}

const defaultParams = {
  page: 1,
  pageSize: 5,
};

const FormItem = Form.Item;
const Option = Select.Option;

const ArticleList: React.FC<ArticleListProps> = ({
  showTitle = true,
  searchParams = {}
}) => {

  const [articles, setArticles] = useState<Article[]>([]);
  const [drawVisible, setDrawVisible] = useState(false);
  const [selectArticle, setSelectArticle] = useState<Article>();
  const [content, setContent] = useState('');
  const [params, setParams] = useState<QueryArticleDto>({...defaultParams, ...searchParams});
  const [total, setTotal] = useState(0);
  const [ form ] = Form.useForm();

  const canUpdate = (record: Article) => {
    return ![ArticleStatusEnum.DELETED, ArticleStatusEnum.DELETED].includes(record.status);
  };

  const toUpdate = (record: Article) => {
    window.open(`editor?articleId=${record.id}`);
  };

  const delArticle = (record: Article, index: number) => {
    deleteArticle(record.id).then(() => {
      Message.success('删除成功');
      articles[index].status = ArticleStatusEnum.DELETED;
      setArticles(prev => [...prev]);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const operateColumns: ColumnProps<Article>[] = [
    {
      title: '操作',
      align: 'center',
      width: 400,
      render: (col, record, index) => {
        return (
          <div className={styles['btn-area']}>
            <Button onClick={() => setSelectArticle(record) }>查看内容</Button>
            {
              canUpdate(record) && (
                <Button type='primary' onClick={() => toUpdate(record) }>更新内容</Button>
              )
            }
            {
              record.status !== ArticleStatusEnum.DELETED && (
                <Button type='primary' status='danger'onClick={() => delArticle(record, index)} >删除</Button>
              ) 
            }
          </div>
        );
      }
    }
  ];

  const columns = [...defaultColumns, ...operateColumns];

  const loadData = (params: QueryArticleDto) => {
    queryArticleList(params).then(res => {
      setArticles(res.data.list);
      setTotal(res.data.pagination.total);
    });
  };

  useEffect(() => {
    loadData(params);
  }, [params]);

  useEffect(() => {
    if (selectArticle) {
      getArticleDetailById(selectArticle.id).then(res => {
        setContent(res.data.content);
      }).catch(err => { Message.warning('拉取内容失败。'); });
    }
  }, [selectArticle]);

  useEffect(() => {
    if (content) {
      setDrawVisible(true);
    }
  }, [content]);

  const handleChange = (pagination: PaginationProps) => {
    const { current = 1 } = pagination;
    setParams(prev => ({
      ...prev,
      page: current,
    }));
  };

  const handleSubmit = (data: Partial<QueryArticleDto>) => {
    setParams(prev => ({
      ...prev,
      ...data,
      page: 1
    }));
  };

  const reset = () => {
    setParams({
      ...defaultParams,
      ...searchParams
    });
    form.resetFields();
  };

  return (
    <div className={styles['article-list-page']}>
      { showTitle && (<h3>文章列表</h3>) }
      <div style={{ padding: '5px' }}>
        <Form form={form} layout='inline' onSubmit={handleSubmit}>
          <FormItem label='文章名称' field='title'>
            <Input style={{ width: 270 }} placeholder='请输入文章名称' />
          </FormItem>
          <FormItem label='状态' field='status'>
            <Select>
              { 
                Object.keys(ARTICLE_STATUS_MAP).map(key => (
                  <Option key={key} value={Number(key)}>
                    { ARTICLE_STATUS_MAP[key as ARTICLE_STATUS_MAP_KEY].value }
                  </Option>
                )) 
              }
            </Select>
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit'>搜索</Button>
            <Button htmlType='reset' onClick={reset}>重置</Button>
          </FormItem>
        </Form>
      </div>
      <Table 
        rowKey='id' 
        onChange={handleChange}
        columns={columns} 
        data={articles}
        pagination={{ total, pageSize: params.pageSize, current: params.page }}
      />
      <Drawer 
        title={selectArticle?.title}
        width={600}
        footer={null}
        visible={drawVisible}
        closable={true}
        onCancel={() => { setDrawVisible(false); }}
      >
        <div style={{ padding: '10px' }}>
          {
            content ? (
              <MarkdownView  value={content} />
            ) : <Empty />
          }
        </div>
      </Drawer>
    </div>
  );
};

export default ArticleList;