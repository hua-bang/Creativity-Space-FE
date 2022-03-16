import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Editor from './components/Editor';
import PointModal from '@/components/Point-Modal';
import { getAllPoint } from '@/api/point';
import { Message } from '@arco-design/web-react';
import { Point as PointType } from '@/typings/point';

const Point: React.FC = () => {

  const [points, setPoints] = useState<PointType[]>([]);

  const getPoint = () => {
    getAllPoint().then(res => {
      setPoints(res.data);
    }).catch(_ => {
      Message.info('获取列表失败');
    });
  };

  useEffect(() => {
    getPoint();
  }, []);

  return (
    <div className={styles['point-page']}>
      <div className={styles['point-page-editor']}>
        <Editor />
      </div>
      <div className={styles['point-page-list']}>
        {
          points.map(point => (
            <PointModal point={point} key={point.id} />
          ))
        }
      </div>
    </div>
  );
};

export default Point;