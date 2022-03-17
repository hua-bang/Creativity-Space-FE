import { Avatar } from '@arco-design/web-react';
import { IconMessage, IconUser } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Comment } from '@/typings/comment';
import IconTip from '../Icon-Tip';
import CommentEditor from '@/components/Comment-Editor';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment
}) => {

  const [showEditor, setShowEditor] = useState(false);

  const toggle = () => {
    setShowEditor(prev => !prev);
  };


  const { user } = comment; 
  return (
    <div className={styles['comment-item']}>
      <div className={styles['comment-item-main']}>
        <div className={styles['comment-item-avatar']}>
          <Avatar size={40}>
            { user.avatar ? <img src={user.avatar} /> : <IconUser /> }
          </Avatar>
        </div>
        <div className={styles['comment-item-content']}>
          <div className={styles['comment-author']}>
            {user.name}
            <span className={styles['comment-author-info']}>{user.job_title}  @{user.company}</span>
          </div>
          <div className={styles['comment-content']}>
            {comment.comment}
          </div>
          <div className={styles['comment-btn-area']}>
            <IconTip
              onClick={toggle}
              icon={<IconMessage />} 
              text={showEditor ? '取消回复' : '回复'} 
              color="#8a919f"
            />
          </div>
          { showEditor && (<CommentEditor withAvatar={false} /> )}
          {
            comment.children?.length && (
              <div className={styles['comment-children-area']}>
                {
                  comment.children && comment.children.map(item => (
                    <CommentItem comment={item} key={item.id}/>
                  ))
                }
              </div>
            ) 
          }
        </div>
      </div>     
    </div>
  );
};

export default CommentItem;