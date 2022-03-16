import React from 'react';
import styles from './index.module.scss';
import IconTip from '../Icon-Tip';
import { IconMessage, IconShareExternal, IconThumbUp } from '@arco-design/web-react/icon';
import { Point } from '@/typings/point';

interface PointModalProps {
  point: Point;
}

const PointModal: React.FC<PointModalProps> = ({
  point
}) => {

  return (
    <div className={styles['point-modal']}>
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
          <IconTip icon={<IconThumbUp />} text="分享" />
        </div>
      </div>
    </div>
  );
};

export default PointModal;