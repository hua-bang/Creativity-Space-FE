import { Booklet } from '@/typings/booklet';
import { BookletArticle } from '@/typings/booklet-article';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Select, Message } from '@arco-design/web-react';
import { createBookletArticle } from '@/api/booklet';
import { useNavigate } from 'react-router-dom';

const FormItem = Form.Item;
const Option = Select.Option;

export type ArticleForm =  Pick<BookletArticle, 'title' | 'id' | 'description' | 'status' | 'booklet_id'>

const options = [
  {
    label: '提交审核',
    value: 1
  },
  {
    label: '草稿',
    value: 0
  }
];

const AddArticle = () => {
  const params = useParams();
  const bookletId = params.id;
  const navigate = useNavigate();

  const toEdit = (articleId: string) => {
    navigate(`/booklet/${bookletId}/edit/${articleId}`);
  };


  const handleSubmit = (data: ArticleForm) => {
    if (bookletId) {
      createBookletArticle({
        ...data,
        booklet_id: bookletId,
        content: ''
      }).then(res => {
        Message.success('新增成功。');
        const articleId = res.data.id;
        setTimeout(() => {
          toEdit(articleId);
        }, 1000);
      }).catch(err => {
        Message.warning(err.message);
      });
    }
  };

  return (
    <div>
      <Form<ArticleForm> onSubmit={handleSubmit}>
        <FormItem label='文章名称' field="title" required>
          <Input placeholder='请输入文章名称' />
        </FormItem>
        <FormItem label='文章描述' field="description" required>
          <Input placeholder='请输入文章描述' maxLength={50} showWordLimit />
        </FormItem>
        <FormItem initialValue={0} label='文章状态' field="status" required>
          <Select
            disabled
            placeholder='选择文章状态'
          >
            {
              options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ offset: 5, span: 19 }}>
          <Button type='primary' htmlType="submit" long>新 建 😊 </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default AddArticle;