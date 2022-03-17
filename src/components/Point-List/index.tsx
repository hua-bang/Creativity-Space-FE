import React, { useEffect, useState } from 'react';
import { Card, Link } from '@arco-design/web-react';
import styles from './index.module.scss';
import { getAllPoint } from '@/api/point';
import { useNavigate } from 'react-router-dom';
import { Point } from '@/typings/point';

const PointList: React.FC = () => {
  const navigate = useNavigate();
  const [pointList, setPointList] = useState<Point[]>([]);

  useEffect(() => {
    getAllPoint().then(res => {
      setPointList(res.data);
    });
  }, []);

  const toPointDetail = (pointId: string) => {
    navigate(`/point/${pointId}`);
  };

  return (
    <Card 
      bordered={false}
      bodyStyle={{ padding: '0' }} 
      style={{ borderRadius: '5px 5px 0 0'}} 
      title='动态推荐' 
      extra={<Link onClick={() => {navigate('/home/point');}}>查看全部</Link>}
    >
      {
        pointList.map(point => (
          <div className={styles['point-item']} key={point.id} onClick={() => {toPointDetail(point.id);}}>
            <div className={styles['point-title']}>
              {point.content}
            </div>
            <div className={styles['point-count-info']}>
              <span>{point.like_count}点赞</span>
              <span>{point.comment_count}评论</span>
            </div>
          </div>
        ))
      }
    </Card>
  );
};

export default PointList;