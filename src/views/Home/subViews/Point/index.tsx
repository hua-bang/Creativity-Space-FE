import React from 'react';
import styles from './index.module.scss';
import TextEditor from '@/components/Text-Editor';

const Point: React.FC = () => {
  console.log('point');

  return (
    <div className={styles['point-page']}>
      <TextEditor />
    </div>
  );
};

export default Point;