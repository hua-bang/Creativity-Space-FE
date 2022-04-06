import { getPointByUserId } from '@/api/point';
import { Point } from '@/typings/point';
import { User } from '@/typings/user';
import { Empty, Message } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import PointModal from '@/components/Point-Modal';

interface AuthorPointListProps {
  author: User;
  userInfo?: User;
}

const AuthorPointList: React.FC<AuthorPointListProps> = ({
  author,
  userInfo, 
}) => {
  const { id } = author;

  const [points, setPoints] = useState<Point[]>([]);

  const loadAuthorPoint = (userId: string) => {
    getPointByUserId(userId).then(res => {
      setPoints(res.data);
    }).catch(err => {
      Message.info('获取动态失败。');
    });
  };

  useEffect(() => {
    id && loadAuthorPoint(id);
  }, [id]);


  return (
    <div className={styles['author-point-list']}>
      {
        points.length > 0 
          ? (
            points.map(point => (<PointModal point={point} key={point.id} />))
          )
          : <Empty />
      }
    </div>
  );
};

export default AuthorPointList;