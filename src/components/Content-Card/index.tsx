import React from 'react';
import { Card, Avatar, Typography } from '@arco-design/web-react';
import styles from './index.module.scss';
import { IconHeart, IconMessage, IconStar, IconStarFill, IconHeartFill } from '@arco-design/web-react/icon';

interface ContentCardProps {
  expand?: boolean;
  // coverUrl: string;
  // author: string;
  // likeCount: number;
  // title: string;
}

const { Meta } = Card;

const ContentCard = ({ 
  expand = true
}: ContentCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: '100%' }}
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
            src='https://res.cloudinary.com/practicaldev/image/fetch/s--EaWTMetC--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kvekov7dwu9fw2fec2r4.png'
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
                <Typography.Text><b>Username</b></Typography.Text>
              </div>
            </div>
            <div className={styles['content-info']}>
              <div className={styles['content-title']}>
                What is your favorite post on DEV? (by someone else!)
              </div>
              <div className={styles['count-info']}>
                <span>
                  <IconHeart />
                  <span className={styles['count-number']}>123 Likes</span>
                </span>
                <span>
                  <IconMessage />
                  <span className={styles['count-number']}>123 Comments</span>
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