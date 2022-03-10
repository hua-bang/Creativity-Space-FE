import React, { useState } from 'react';
import MarkDownEditor from '../../components/MarkDown-Editor';
import styles from './index.module.scss';
import { Button } from '@arco-design/web-react';

const Editor = () => {
  const [value, setValue] = useState('');

  const handleEditorChange: (val: string) => void = (val: string) => {
    console.log(val);
    setValue(val);
  };

  const uploadImg = async (files: File[]) => {
    return [
      {
        url: 'https://img1.baidu.com/it/u=1407750889,3441968730&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=799'
      }
    ];
  };
  

  return (
    <>
      <div className={styles['nav-area']}>
        <div className={styles['nav-title-input']}>
          <input type="text" placeholder='输入文章标题...' />
        </div>
        <div className={styles['nav-btn-area']}>
          <span className={styles['tip']}>保存成功</span>
          <Button type="dashed">草稿箱</Button>
          <Button type="primary">发布</Button>
        </div>
      </div>
      <MarkDownEditor
        value={value}
        uploadImages={uploadImg}
        onChange={handleEditorChange}
      />
    </>
  );
};

export default Editor;