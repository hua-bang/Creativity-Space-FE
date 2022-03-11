import React from 'react';
import { Card, Avatar, Typography } from '@arco-design/web-react';
import styles from './index.module.scss';
import { IconHeart, IconMessage, IconStar, IconStarFill, IconHeartFill } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { Article } from '@/typings/article';

interface ContentCardProps {
  expand?: boolean;
  article: Article;
}

const { Meta } = Card;

const ContentCard = ({ 
  expand = true,
  article
}: ContentCardProps) => {
  
  const navigate = useNavigate();

  const toArticleDetail = () => {
    navigate(`/article/${article.id}`);
  };
  
  return (
    <Card
      hoverable
      onClick={toArticleDetail}
      style={{ width: '100%', cursor: 'pointer' }}
      bodyStyle={{
        padding: '0 15px 15px 15px',
      }}
      cover={
        <div
          style={{
            display: expand ? 'block' : 'none',
            overflow: 'hidden',
            marginBottom: expand ? '-20px' : '0px'
          }}
        >
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt='dessert'
            src={article.cover_url}
          />
        </div>
      }
    >
      <Meta
        description={
          <>
            <div className={styles['author-info']}>
              <Avatar size={24} style={{ marginRight: 8 }}>
                A
              </Avatar>
              <div>
                <Typography.Text><b>{article.user?.name ?? article.user?.username}</b></Typography.Text>
              </div>
            </div>
            <div className={styles['content-info']}>
              <div className={styles['content-title']}>
                {article.title}
              </div>
              <div className={styles['count-info']}>
                <span>
                  <IconHeart />
                  <span className={styles['count-number']}>{article.like_count} Likes</span>
                </span>
                <span>
                  <IconMessage />
                  <span className={styles['count-number']}>{article.comment_count} Comments</span>
                </span>
              </div>
            </div>
          </>
          
        }
      />
    </Card>
  );
};

export default ContentCard;