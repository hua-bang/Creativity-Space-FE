import { User } from '@/typings/user';
import { Card, Message, Modal } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import AuthorList from '@/components/Author-List';
import { getBeFollowers, getFollowers } from '@/api/user-follow';
import AuthorItem from '@/components/Author-Item';

interface AuthorCountInfoProps {
  author: User
}

const AuthorCountInfo: React.FC<AuthorCountInfoProps> = ({
  author
}) => {

  const [followers, setFollowers] = useState<User[]>([]);
  const [beFollowers, setBeFollowers] = useState<User[]>([]);

  const [followersVisible, setFollowersVisible] = useState(false);
  const [beFollowersVisible, setBeFollowersVisible] = useState(false);

  const loadUser = (promiseFn: (id: string) => Promise<any>, resolveFn: (data: User[]) => void) => {
    promiseFn(author.id).then(res => {
      resolveFn(res.data);
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  useEffect(() => {
    if(author) {
      loadUser(getFollowers, (data) => {
        setFollowers(data);
      });
      loadUser(getBeFollowers, (data) => {
        setBeFollowers(data);
      });
    }
  }, [author]);

  const showFollowers = () => {
    setFollowersVisible(true);
  };

  const showBeFollowers = () => {
    setBeFollowersVisible(true);
  };

  return (
    <div className={styles['author-count-info']}>
      <div className={styles['author-achievement-info']}>
        <Card bordered={false} title="个人成就">
          <div className={styles['article-author-others-info']}>
            <div className={styles['article-author-count-item']}>
              <span>👍</span> 获取点赞 { author.get_like_count}
            </div>
            <div className={styles['article-author-count-item']}>
              <span>👀</span> 文章被阅读数 { author.get_view_count}
            </div>
          </div>
        </Card>
      </div>
      <div className={styles['author-follow-info']}>
        <div onClick={showFollowers}>
          <div>关注了</div>
          <div>{author.follow_count}</div>
        </div>
        <div onClick={showBeFollowers}>
          <div>关注者</div>
          <div>{author.followed_count}</div>
        </div>
      </div>
      <div className={styles['author-recommend-list']}>
        <AuthorList bordered={false} />
      </div>
      <Modal onCancel={() => setFollowersVisible(false)} title='关注列表' visible={followersVisible} footer={null}>
        <div>
          {
            followers.map(user => (
              <AuthorItem author={user} key={user.id} />
            ))
          }
        </div>
      </Modal>
      <Modal onCancel={() => setBeFollowersVisible(false)} title='关注者列表' visible={beFollowersVisible} footer={null}>
        <div>
          {
            beFollowers.map(user => (
              <AuthorItem author={user} key={user.id} />
            ))
          }
        </div>
      </Modal>
    </div>
  );
};

export default AuthorCountInfo;