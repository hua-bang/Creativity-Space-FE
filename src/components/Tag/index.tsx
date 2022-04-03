import React, { ReactElement } from 'react';
import styles from './index.module.scss';

interface TagProps {
  flagColor?: string; 
}

const Tag: React.FC<TagProps> = (props) => {
  const {
    children, 
    flagColor
  } = props;

  return (
    <span className={styles['tag']}>
      # { children }
    </span>
  );
};

export default Tag;