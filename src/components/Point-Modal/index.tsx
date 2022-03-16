import React from 'react';
import styles from './index.module.scss';
import IconTip from '../Icon-Tip';
import { IconMessage, IconShareExternal, IconThumbUp } from '@arco-design/web-react/icon';

const PointModal: React.FC = () => {
  return (
    <div className={styles['point-modal']}>
      <div className={styles['point-info']}>
        <div className={styles['point-user-info']}>
          <div className={styles['point-user-info-avatar']}>
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s---DG-eTcu--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/286870/7078154e-079f-49a3-bdb1-fe3ef8d7f075.jpeg" />
          </div>
          <div className={styles['point-user-info-other']}>
            <div className={styles['user-info-name']}>
              神说要有光
            </div>
            <div className={styles['user-info-description']}>
              前端工程师
            </div>
          </div>
        </div>
        <div className={styles['point-content-info']}>
          兄弟们，xxx东西有学习网址么？
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