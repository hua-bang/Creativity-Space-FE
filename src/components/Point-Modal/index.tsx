import React, { useState } from 'react';
import styles from './index.module.scss';
import IconTip from '../Icon-Tip';
import { IconDelete, IconMessage, IconShareExternal, IconThumbUp } from '@arco-design/web-react/icon';
import { Point } from '@/typings/point';
import { useNavigate } from 'react-router-dom';
import { Image, Message, Popconfirm, Space } from '@arco-design/web-react';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { deletePoint, likePoint } from '@/api/point';
import copy from 'copy-to-clipboard';

interface PointModalProps {
  point: Point;
}

const PointModal: React.FC<PointModalProps> = ({
  point
}) => {
  const navigate = useNavigate();
  const { userStore } = useStore();
  
  const canDelete = userStore.userInfo?.id === point.user.id;

  const [likeCount, setLikeCount] = useState(point.like_count);

  const toPointDetail = () => {
    navigate(`/point/${point.id}`);
  };

  const handleShareClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    copy(window.location.href);
    Message.success('连接复制到剪切板，请查收。');
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

  const imgList = point.img_str ? point.img_str.split(',') : [];

  const delPoint = () => {
    deletePoint(point.id).then(res => {
      Message.success('删除成功');
      navigate('/');
    }).catch(err => {
      Message.warning(err.message);
    });
  };
  
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
              {
                canDelete && (
                  <div className={styles['user-info-delete']}>
                    <Popconfirm
                      title="确定删除？该操作不可逆"
                      onOk={delPoint}
                    >
                      <IconTip icon={<IconDelete />} text="删除" />
                    </Popconfirm>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className={styles['point-content-info']} onClick={toPointDetail}>
          { point.tag && <span className={styles['point-tag-item']}>#{point.tag.name}#</span> }
          { point.content }
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
        <div onClick={handleShareClick}>
          <IconTip icon={<IconShareExternal />} text="分享" />
        </div>
        <div onClick={toPointDetail}>
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