import React from 'react';
import styles from './index.module.scss';
import IconTip from '../Icon-Tip';
import { IconMessage, IconShareExternal, IconThumbUp } from '@arco-design/web-react/icon';
import { Point } from '@/typings/point';
import { useNavigate } from 'react-router-dom';

interface PointModalProps {
  point: Point;
}

const PointModal: React.FC<PointModalProps> = ({
  point
}) => {
  const navigate = useNavigate();

  const toPointDetail = () => {
    navigate(`/point/${point.id}`);
  };

  return (
    <div className={styles['point-modal']} onClick={toPointDetail}>
      <div className={styles['point-info']}>
        <div className={styles['point-user-info']}>
          <div className={styles['point-user-info-avatar']}>
            <img src={point.user.avatar} />
          </div>
          <div className={styles['point-user-info-other']}>
            <div className={styles['user-info-name']}>
              {point.user.name}
            </div>
            <div className={styles['user-info-description']}>
              {point.user.job_title} | {point.user.company}
            </div>
          </div>
        </div>
        <div className={styles['point-content-info']}>
          {point.content}
        </div>
      </div>
      <div className={styles['point-operate']}>
        <div>
          <IconTip icon={<IconShareExternal />} text="分享" />
        </div>
        <div>
          <IconTip icon={<IconMessage />} text="评论" />
        </div>
        <div>
          <IconTip icon={<IconThumbUp />} text="点赞" />
        </div>
      </div>
    </div>
  );
};

export default PointModal;