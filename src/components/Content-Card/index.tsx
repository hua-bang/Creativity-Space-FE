import React from 'react';
import { Card, Avatar, Typography, Popconfirm, Message } from '@arco-design/web-react';
import styles from './index.module.scss';
import { IconHeart, IconMessage, IconStar, IconStarFill, IconHeartFill, IconUser, IconDelete, IconEdit } from '@arco-design/web-react/icon';
import { useNavigate } from 'react-router-dom';
import { Article } from '@/typings/article';
import IconTip from '../Icon-Tip';
import { deleteArticle } from '@/api/article';

interface ContentCardProps {
  expand?: boolean;
  article: Article;
  canDelete?: boolean;
}

const { Meta } = Card;

const ContentCard = ({ 
  expand = true,
  article,
  canDelete = false
}: ContentCardProps) => {
  
  const navigate = useNavigate();

  const toArticleDetail = () => {
    navigate(`/article/${article.id}`);
  };

  const operateAreaClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const handleDelete = () => {
    deleteArticle(article.id).then(res => {
      Message.success('删除成功');
      setTimeout(() => {
        location.reload();
      }, 1000);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleEdit = () => {
    navigate(`/editor?articleId=${article.id}`);
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
          <div className='wrapper'>
            <div className={styles['author-info']}>
              <Avatar size={28} style={{ background: '#3370ff'}}>
                { 
                  article.user?.avatar 
                    ? <img alt='avatar' src={article.user?.avatar } />
                    : <IconUser fontSize={20} /> 
                }
              </Avatar>
              <div className={styles['author-info-name']}>
                <Typography.Text><b>{article.user?.name ?? article.user?.username}</b></Typography.Text>
              </div>
            </div>
            <div className={styles['content-info']}>
              <div className={styles['content-title']}>
                {article.title}
              </div>
              <div className={styles['content-description']}>
                {article.description}
              </div>
              {
                article.tags.length > 0 && (
                  <div className={styles['tags-area']}>
                    { 
                      article.tags.map(tag => (
                        <span key={tag.id}>#{tag.name}</span>
                      )) 
                    }
                  </div>
                )
              }
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
              {
                canDelete && (    
                  <div className={styles['operate-info']} onClick={operateAreaClick}>
                    <Popconfirm title="确定删除？（该操作不可逆）" onOk={handleDelete}>
                      <IconTip icon={<IconDelete />} size="20px"/>
                    </Popconfirm>
                    <IconTip onClick={handleEdit} icon={<IconEdit />} size="20px" />
                  </div>
                )
              }
            </div>
          </div>
          
        }
      />
    </Card>
  );
};

export default ContentCard;