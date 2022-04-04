import React, { useState } from 'react';
import TextEditor from '@/components/Text-Editor';
import { creatPoint } from '@/api/point';
import { Message } from '@arco-design/web-react';

const Editor: React.FC = () => {

  const [value, setValue] = useState('');

  const handleTextChange = (val: string) => {
    setValue(val);
  };

  const handleSubmit = (val: string, images: string[], tag: string) => {
    creatPoint({
      content: val,
      img_str: images.join(','),
      point_tag_id: tag
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