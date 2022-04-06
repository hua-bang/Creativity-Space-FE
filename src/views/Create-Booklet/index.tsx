import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Form, Modal, Upload, Input, Button, Message } from '@arco-design/web-react';
import CosUpload from '@/components/Cos-Upload';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { createBooklet, getBookletDetail, updateBooklet } from '@/api/booklet';
import { Booklet, CreateBookletType } from '@/typings/booklet';
import { useParams } from 'react-router-dom';

const BookletForm: React.FC = () => {

  const [imgList, setImgList] = useState<UploadItem[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [booklet, setBooklet] = useState<Booklet>();

  const params = useParams();
  const bookletId = params.id;

  const FormItem = Form.Item;
  const [ form ] = Form.useForm();

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
          <FormItem label='小册介绍' field="introduce" required>
            <Input placeholder='请输入小册介绍' />
          </FormItem>
          <FormItem wrapperCol={{ offset: 3, span: 19 }}>
            <Button type='primary' htmlType="submit" long>保 存 😊 </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default BookletForm;