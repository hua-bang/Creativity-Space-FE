import { Editor, EditorProps } from '@bytemd/react';
import React from 'react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';

const plugins = [
  gfm(),
  highlight()
];

const MarkDownEditor = (props: EditorProps) => {

  const {
    value,
    onChange,
    uploadImages
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