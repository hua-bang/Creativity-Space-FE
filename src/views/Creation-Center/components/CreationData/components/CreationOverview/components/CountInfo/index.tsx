import React, { useEffect, useState } from 'react';
import { IconBook, IconEdit, IconEye, IconHeart, IconMessage, IconUser } from '@arco-design/web-react/icon';
import CountItem from '@/components/Count-Item';
import styles from './index.module.scss';
import { getUserStaticInfo } from '@/api/user';
import useStore from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';

const CountInfo = () => {

  const [info, setInfo] = useState<Record<string, number>>({});

  const { userStore } = useStore();

  const { userInfo } = userStore;

  const loadInfo = () => {
    getUserStaticInfo().then(res => {
      setInfo(res.data);
    });
  };

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <div className={styles['count-area-wrapper']}>
      <div className={styles['count-area']}>
        <div>
          <CountItem 
            icon={<IconEdit style={{ color: '#ff7d00' }} />}
            count={info.articleCount}
            bgColor="#ffe4ba"
            title="文章总数"
          />
        </div>
        <div>
          <CountItem 
            icon={<IconMessage style={{ color: '#165dff' }} />}
            count={info.pointCount}
            title="动态数量"
          />
        </div>
        <div>
          <CountItem 
            icon={<IconBook style={{ color: '#14c9c9' }} />}
            count={info.bookletCount}
            bgColor="#b7f4ec"
            title="小册数量"
          />
        </div>
      </div>
      {
        userInfo && (
          <div className={styles['count-area']}>
            <div>
              <CountItem 
                icon={<IconUser style={{ color: '#ff7d00' }} />}
                count={userInfo.followed_count}
                bgColor="#ffe4ba"
                title="被关注数"
              />
            </div>
            <div>
              <CountItem 
                icon={<IconHeart style={{ color: 'red' }} />}
                count={userInfo.get_like_count}
                title="获得点赞数"
              />
            </div>
            <div>
              <CountItem 
                icon={<IconEye style={{ color: '#14c9c9' }} />}
                count={userInfo.get_view_count}
                title="获取游览量"
              />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default observer(CountInfo);