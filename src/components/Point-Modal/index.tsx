import React, { useState } from 'react';
import styles from './index.module.scss';
import IconTip from '../Icon-Tip';
import { IconMessage, IconShareExternal, IconThumbUp } from '@arco-design/web-react/icon';
import { Point } from '@/typings/point';
import { useNavigate } from 'react-router-dom';
import { Image, Message, Space } from '@arco-design/web-react';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { likePoint } from '@/api/point';

interface PointModalProps {
  point: Point;
}

const PointModal: React.FC<PointModalProps> = ({
  point
}) => {
  const navigate = useNavigate();
  const { userStore } = useStore();

  const [likeCount, setLikeCount] = useState(point.like_count);

  const toPointDetail = () => {
    navigate(`/point/${point.id}`);
  };

  const handleLikeClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!userStore.isLogin) {
      Message.warning('未登录，不能点赞哈。');
      return;
    }
    likePoint(point.id).then(res => {
      Message.success('操作成功');
      setLikeCount(res.data.likeCount);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const imgList = point.img_str?.split(',') || [];

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
        {
          imgList.length > 0 && (    
            <div className={styles['point-content-image']}>
              <Image.PreviewGroup infinite>
                <Space>
                  {
                    imgList.map((src, index) => <Image
                      key={index}
                      src={src}
                      style={{ margin: '10px 5px', marginBottom: '0' }}
                      width={150}
                      alt={`lamp${index + 1}`}
                    />)
                  }
                </Space>
              </Image.PreviewGroup>
            </div>
          )
        }
      </div>
      <div className={styles['point-operate']}>
        <div>
          <IconTip icon={<IconShareExternal />} text="分享" />
        </div>
        <div>
          <IconTip icon={<IconMessage />} text={ point.comment_count ? `${point.comment_count}` : '评论' } />
        </div>
        <div onClick={handleLikeClick} >
          <IconTip 
            icon={<IconThumbUp />} 
            text={ likeCount ? `${likeCount}` : '点赞' } 
          />
        </div>
      </div>
    </div>
  );
};

export default observer(PointModal);