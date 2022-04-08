import { BookletArticle } from '@/typings/booklet-article';
import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from '@arco-design/web-react';

interface PublishFormProps {
  article?: BookletArticle;
  title: string;
  onSubmit?: (data: ArticleForm) => void; 
}

export type ArticleForm =  Pick<BookletArticle, 'title' | 'id' | 'description' | 'status'>

const FormItem = Form.Item;
const Option = Select.Option;

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

const PublishForm: React.FC<PublishFormProps> = ({
  article,
  onSubmit
}) => {
  const [ form ] = Form.useForm<ArticleForm>();
  
  const handleSubmit = (data: ArticleForm) => {
    onSubmit && onSubmit(data);
  };

  useEffect(() => {
    form.setFieldsValue(article as ArticleForm);
  }, [article]);

  return (
    <div>
      <Form<ArticleForm> form={form} onSubmit={handleSubmit}>
        <FormItem label='文章名称' field="title" required>
          <Input placeholder='请输入文章名称' />
        </FormItem>
        <FormItem label='文章描述' field="description" required>
          <Input placeholder='请输入文章描述' maxLength={50} showWordLimit />
        </FormItem>
        <FormItem label='文章状态' field="status" required>
          <Select
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
          <Button type='primary' htmlType="submit" long>保 存 😊 </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default PublishForm;