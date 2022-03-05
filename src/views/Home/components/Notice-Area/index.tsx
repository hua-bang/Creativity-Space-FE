import React from 'react';
import AuthorList from '../../../../components/Author-List';
import ContentList from '../../../../components/Content-List';
import styles from './index.module.scss';

const NoticeArea = () => {
  return (
    <div className={styles['notice-area']}>
      <AuthorList />
      <ContentList />
    </div>
  );
};

export default NoticeArea;