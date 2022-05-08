import { Article, ArticleStatusEnum } from '@/typings/article';
import { Skeleton } from '@arco-design/web-react';
import React from 'react';
import styles from './index.module.scss';
import { Viewer } from '@bytemd/react';
import Avatar from '@arco-design/web-react/es/Avatar/avatar';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import CommentArea from './components/comment-area';
import Tag from '@/components/Tag';
import { observer } from 'mobx-react-lite';
import { Tag as ArcoTag } from '@arco-design/web-react';
import { ARTICLE_STATUS_MAP } from '@/const/article';


const plugins = [
  gfm(),
  highlight()
];

interface ArticleAreaProps {
  article?: Article;
}

const ArticleArea: React.FC<ArticleAreaProps> = ({
  article
}) => {
  return (
    <div className={styles['article-area']}>
      {
        article ?
          (
            <div className={styles['article-main']}>
              <div className={styles['article-img']}>
                <img src={article.cover_url} />
              </div>
              <div className={styles['article-author-info']}>
                <Avatar>
                  <img alt='avatar' src={article.user?.avatar} />
                </Avatar>
                <span className={styles['article-author-info-name']}>
                  { article.user?.name ?? article.user?.username}
                </span>
              </div>
              <div className={styles['article-title']}>
                {article.title}
              </div>
              {
                article.status !== ArticleStatusEnum.AUDITED && (
                  <div className={styles['article-title-status']}>
                    <ArcoTag color={ARTICLE_STATUS_MAP[article.status].color}>
                      {
                        ARTICLE_STATUS_MAP[article.status].value
                      }
                    </ArcoTag>
                  </div>
                )
              }
              {
                article.tags.length > 0 && (
                  <div className={styles['article-tag']}>
                    {
                      article.tags.map(item => (
                        <Tag key={item.id}>{item.name}</Tag>                    
                      ))
                    }
                  </div>
                )
              }
              <div className={styles['article-content']}>
                <Viewer plugins={plugins} value={article.content}/>
              </div>
              <div className={styles['article-comment-wrapper']} id="article-comment">
                <CommentArea article={article} />
              </div>
            </div>
          ) :
          (<Skeleton style={{ height: '100%', width: '100%' }} />)
      }
    </div>
  );
};

export default observer(ArticleArea);