import React, { useEffect, useState } from 'react';
import PointModal from '@/components/Point-Modal';
import { Empty } from '@arco-design/web-react';
import styles from './index.module.scss';
import { getPointById } from '@/api/point';
import { Point } from '@/typings/point';
import { useParams } from 'react-router-dom';


const Main: React.FC = () => {

  const params = useParams();
  const pointId = params.id;

  const [point, setPoint] = useState<Point>();


  const loadPointData = (pointId: string) => {
    getPointById(pointId).then(res => {
      setPoint(res.data);
    });
  };

  useEffect(() => {
    pointId && loadPointData(pointId);
  }, [pointId]);


  return (
    <div className={styles['main-page']}>
      { point ? <PointModal point={point} /> : <Empty/> }
    </div>
  );
};

export default Main;
