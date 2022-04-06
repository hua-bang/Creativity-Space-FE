import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Form, Modal, Upload, Input, Button, Message, Drawer } from '@arco-design/web-react';
import CosUpload from '@/components/Cos-Upload';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { createBooklet, getBookletDetail, updateBooklet } from '@/api/booklet';
import { Booklet, CreateBookletType } from '@/typings/booklet';
import { useParams } from 'react-router-dom';
import MarkDownEditor from '@/components/MarkDown-Editor';

const BookletForm: React.FC = () => {

  const [imgList, setImgList] = useState<UploadItem[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [booklet, setBooklet] = useState<Booklet>();
  const [introduce, setIntroduce] = useState<string>('');
  const [visible, setVisible] = useState(false); 

  const params = useParams();
  const bookletId = params.id;

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
      updateBooklet({
        ...booklet,
        ...data,
        introduce,
        cover_url: urls[0],
      }).then(res => {
        Message.success('修改成功。');
      }).catch(err => {
        Message.warning(err.message);
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

  const loadBooklet = (bookletId: string) => {
    getBookletDetail(bookletId).then(res => {
      if (res.data) {
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
      <div className={styles['setting-title']}>
        { bookletId ? '修改小册' : '创建小册' }
      </div>
      <div className={styles['setting-page']}>
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
    </div>
  );
};

export default BookletForm;