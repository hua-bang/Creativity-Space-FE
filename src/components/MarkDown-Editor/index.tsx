import { Editor, EditorProps } from '@bytemd/react';
import React from 'react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Message } from '@arco-design/web-react';
import { uploadArticleImg } from '@/api/article';

const plugins = [
  gfm(),
  highlight()
];

const defaultUploadImg = async (files: File[]) => {
  try {
    const res = await uploadArticleImg(files[0]);
    const { url } = res.data;
    return [{ url }];
  } catch(err) {
    Message.warning('图片上传失败，请稍后再试。');
  }
  return [];
};
const MarkDownEditor = (props: EditorProps) => {

  const {
    value,
    onChange,
    uploadImages = defaultUploadImg
  } = props;
  
  return (
    <Editor
      uploadImages={uploadImages}
      value={value}
      plugins={plugins}
      onChange={onChange}
    />
  );
};

export default MarkDownEditor;