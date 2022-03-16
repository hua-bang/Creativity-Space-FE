import React, { useState } from 'react';
import TextEditor from '@/components/Text-Editor';
import { creatPoint } from '@/api/point';
import { Message } from '@arco-design/web-react';

const Editor: React.FC = () => {

  const [value, setValue] = useState('');

  const handleTextChange = (val: string, imgArr: string[]) => {
    setValue(val);
  };

  const handleSubmit = (val: string) => {
    creatPoint({
      content: val
    }).then(res => {
      const { id } = res.data;
      Message.success('新建动态成功');
      setTimeout(() => {
        window.open(`/point/${id}`);
      }, 1000);
    });
  };

  return (
    <TextEditor value={value} onChange={handleTextChange} onFinish={handleSubmit}  />
  );
};

export default Editor;