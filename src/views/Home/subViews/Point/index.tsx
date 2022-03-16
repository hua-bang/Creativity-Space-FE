import React from 'react';
import styles from './index.module.scss';
import TextEditor from '@/components/Text-Editor';
import PointModal from '@/components/Point-Modal';

const Point: React.FC = () => {
  console.log('point');

  return (
    <div className={styles['point-page']}>
      <div className={styles['point-page-editor']}>
        <TextEditor />
      </div>
      <div className={styles['point-page-list']}>
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
        <PointModal />
      </div>
    </div>
  );
};

export default Point;