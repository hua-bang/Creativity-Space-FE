import React from 'react';
import { Form, Input } from '@arco-design/web-react';

const FormItem = Form.Item;

export const formColumns = [
  {
    id: 'id',
    render() {
      return (<FormItem label='草稿id' field='id'>
        <Input style={{ width: 160 }} placeholder='请输入草稿id' />
      </FormItem>);
    }
  }, 
  {
    id: 'content',
    render() {
      return (
        <FormItem label='草稿标题' field='title'>
          <Input style={{ width: 160 }} placeholder='草稿标题' />
        </FormItem>
      );
    }
  }
];