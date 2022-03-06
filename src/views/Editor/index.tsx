import React, { useState } from 'react';
import MarkDownEditor from '../../components/MarkDown-Editor';

const Editor = () => {
  const [value, setValue] = useState('');

  const handleEditorChange: (val: string) => void = (val: string) => {
    console.log(val);
    setValue(val);
  };

  const uploadImg = async (files: File[]) => {
    console.log(files);
    return [
      {
        url: 'https://img1.baidu.com/it/u=1407750889,3441968730&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=799'
      }
    ];
  };
  

  return (
    <MarkDownEditor
      value={value}
      uploadImages={uploadImg}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;