import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Modal } from '@arco-design/web-react';
import { getCategories, getTags } from '@/api/common';
import { Tag, Category } from '@/typings/resource';
import { Article, CreateArticleType } from '@/typings/article';
import { BASE_URL } from '@/config/network';
import useToken from '@/hooks/useToken';
import { UploadItem } from '@arco-design/web-react/es/Upload';

export type ArticleFormProps = Omit<CreateArticleType, 'content' | 'title'>;

interface PublishFormProps {
  onSave: (article: ArticleFormProps) => void;
  article?: Article;
}

const FormItem = Form.Item;
const Option = Select.Option;

const PublishForm: React.FC<PublishFormProps> = ({
  onSave,
  article,
}) => {

  const [form] = Form.useForm<ArticleFormProps>();
  
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const imgList: UploadItem[] = article ? [{ uid: 'article_img', name: 'test', url: article.cover_url } ] : [];
  const [token] = useToken();

  const loadTagAndCategoryData = () => {
    Promise.all([getCategories(), getTags()]).then(res => {
      const [categoryArr, tagArr] = res;
      setTags(tagArr);
      setCategories(categoryArr);
    });
  };

  useEffect(() => {
    loadTagAndCategoryData();
  }, []);

  const setFormValueFromArticle = (article: Article) =>  {
    const { 
      category_id,
      description,
      tags,
      cover_url
    } = article;
    const tagIds = tags.map(item => item.id);
    form.setFieldsValue({
      category_id,
      tags: tagIds as any,
      description
    });
  };

  useEffect(() => {
    article && setFormValueFromArticle(article);
  }, [article]);

  const handleSubmit = (data: ArticleFormProps & { cover_file: any }) => {
    const { cover_file } = data;
    const file = cover_file[0];
    const url = file.response ? file.response.data.url : file.url;
    
    onSave({
      ...data,
      cover_url: url
    });
  };
  
  return (
    <Form<ArticleFormProps>
      form={form}
      onSubmit={handleSubmit as any}
      style={{  marginTop: '10px', width: '100%' }}
      size="large"
    >
      <FormItem field="category_id" label='文章分类' required >
        <Select
          placeholder='请选择文章分类'
        >
          {categories.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
      </FormItem>
      <FormItem label='文章标签' field='tags' rules={[{required: true}]}>
        <Select 
          mode="multiple"
          placeholder='请选择文章标签'
        >
          {tags.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
      </FormItem>
      <Form.Item
        label='文章封面'
        field='cover_file'
        triggerPropName='fileList'
        required
        initialValue={imgList}
      >
        <Upload
          listType='picture-card'
          name='file'
          limit={1}
          action={`${BASE_URL}/cos/article/upload`}
          headers={{
            Authorization: `Bearer ${token}`
          }}
          onPreview={(file: any) => {
            Modal.info({
              title: 'Preview',
              content: <img src={file.url || URL.createObjectURL(file.originFile)} style={{maxWidth: '100%'}}></img>
            });
          }}
        />
      </Form.Item>
      <FormItem label='编辑描述' field='description' rules={[{required: true}]}>
        <Input.TextArea 
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder='输入文章简要描述'
        />
      </FormItem>
      <FormItem style={{ width: '100%', textAlign: 'right' }} wrapperCol={{ span: 24 }}>
        <div>
          <Button>重置</Button>
          <Button style={{ marginLeft: '10px' }} type='primary' htmlType='submit'>发布</Button>
        </div>
      </FormItem>
    </Form>
  );
};

export default PublishForm;