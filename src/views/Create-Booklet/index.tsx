import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Form, Input, Button, Message, Drawer, Modal } from '@arco-design/web-react';
import CosUpload from '@/components/Cos-Upload';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { createBooklet, deleteBookletById, getBookletDetail, updateBooklet } from '@/api/booklet';
import { Booklet, CreateBookletType } from '@/typings/booklet';
import { useParams } from 'react-router-dom';
import MarkDownEditor from '@/components/MarkDown-Editor';
import ArticleList from './components/Article-List';
import { BookletArticle } from '@/typings/booklet-article';
import { useNavigate } from 'react-router-dom';

const BookletForm: React.FC = () => {

  const [imgList, setImgList] = useState<UploadItem[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [booklet, setBooklet] = useState<Booklet>();
  const [introduce, setIntroduce] = useState<string>('');
  const [visible, setVisible] = useState(false); 

  const navigate = useNavigate();

  const params = useParams();
  const bookletId = params.id;

  const isUpdate = !!bookletId;

  const FormItem = Form.Item;
  const [ form ] = Form.useForm();

  const handleEditorChange = (value: string) => {
    setIntroduce(value);
  };
  
  const handleUploadSuccess = (urls: string[]) => {
    setUrls(urls);
  };

  const handleChange = (fileList: UploadItem[]) => {
    setImgList(fileList);
  };

  const create = (data: CreateBookletType) => {
    createBooklet({
      ...data,
      cover_url: urls[0],
      introduce,
    }).then(res => {
      Message.success('新建成功。');
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const update = (data: CreateBookletType) => {
    if (booklet) {
      Modal.confirm({
        title: '提示信息',
        content: '修改会重新走审核流程，请确认。',
        onOk() {
          updateBooklet({
            ...booklet,
            ...data,
            introduce,
            cover_url: urls[0],
          }).then(res => {
            Message.success('修改成功,待管理员审核。');
          }).catch(err => {
            Message.warning(err.message);
          });
        }
      });
    }
  };

  const handleSubmit = (data: CreateBookletType) => {
    if (bookletId) {
      update(data);
    } else {
      create(data);
    }
  };

  const deleteBooklet = () => {
    if (bookletId) {
      Modal.confirm({
        title: '提示信息',
        content: '删除操作不可逆，请确定',
        onOk() {
          deleteBookletById(bookletId).then(res => {
            Message.success('删除成功');
            setTimeout(() => {
              navigate('/creation-center');
            }, 1000);
          }).catch(err => {
            Message.error('请求错误，请重试');
          });
        }
      });
    }
  };

  const loadBooklet = (bookletId: string) => {
    getBookletDetail(bookletId).then(res => {
      if (res.data) {
        res.data.articles = res.data.articles.sort((a: BookletArticle, b: BookletArticle) => (a.order - b.order));
        setBooklet(res.data);
        setIntroduce(res.data.introduce);
      }
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  useEffect(() => {
    bookletId && loadBooklet(bookletId);
  }, [bookletId]);

  useEffect(() => {
    if (booklet) {
      form.setFieldsValue({
        ...booklet
      });
      setUrls([booklet.cover_url]);
      setImgList([{ uid: 'cover_url', url: booklet.cover_url }]);
    }
  }, [booklet]);


  return (
    <div className={styles['setting-page-wrapper']}>
      <div className={styles['setting-page']}>
        <div className={styles['setting-title']}>
          { bookletId ? '修改小册' : '创建小册' }
        </div>
        <Form form={form} labelCol={{ offset: 0, span: 3 }} onSubmit={handleSubmit}>
          <FormItem label="封面" required>
            <CosUpload
              onChange={handleChange}
              limit={1}
              onUploadSuccess={handleUploadSuccess}
              listType='picture-card'
              fileList={imgList}
            />
          </FormItem>
          <FormItem label='小册名称' field="name" required>
            <Input placeholder='请输入小册名称' maxLength={20} showWordLimit />
          </FormItem>
          <FormItem label='小册描述' field="description" required>
            <Input placeholder='请输入小册描述' maxLength={50} showWordLimit />
          </FormItem>
          <FormItem label='小册介绍' required>
            <Button type="primary" onClick={() => { setVisible(true); }}>查看 / 编辑</Button>
          </FormItem>
          <FormItem wrapperCol={{ offset: 3, span: 19 }}>
            <Button type='primary' htmlType="submit" long>保 存 😊 </Button>
            {
              isUpdate && (  
                <Button onClick={deleteBooklet} status='danger' type='secondary' style={{ marginTop: '20px' }} long>
                  删除
                </Button>   
              )
            }
          </FormItem>
        </Form>
      </div>
      <Drawer 
        onCancel={() => { setVisible(false); }} 
        visible={visible} width="100%" 
        title="小册介绍(同步修改)" 
        bodyStyle={{ margin: 0, padding: 0 }}
        footer={null}
      >
        <MarkDownEditor value={introduce} onChange={handleEditorChange} />
      </Drawer>
      { booklet && <ArticleList booklet={booklet} /> }
    </div>
  );
};

export default BookletForm;