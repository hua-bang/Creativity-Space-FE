import React, { useState } from 'react';
import styles from './index.module.scss';
import CommentEditor from '@/components/Comment-Editor';

interface CommentAreaProps {
  comment?: Array<any>;
}

const CommentArea: React.FC<CommentAreaProps> = ({

}) => {

  const [value, setValue] = useState<string>('');

  const handleChange = (val: string) => {
    setValue(val);
    console.log(val);
  };

  return (
    <div className={styles['comment-area']}>
      <div className={styles['comment-area-title']}>
        评论区
      </div>
      <div className={styles['comment-area-editor-wrapper']}>
        <CommentEditor value={value} onChange={handleChange} />
      </div>
    </div>
  );
};

export default CommentArea;