import { Avatar, Message } from '@arco-design/web-react';
import { IconMessage, IconUser } from '@arco-design/web-react/icon';
import React, { useState } from 'react';
import styles from './index.module.scss';
import { Comment } from '@/typings/comment';
import IconTip from '../Icon-Tip';
import CommentEditor from '@/components/Comment-Editor';

export interface OnFinishCommentType {
  comment: string;
  to_user_id: string;
  be_comment_id: string;
}

interface CommentItemProps {
  comment: Comment;
  onComment?: () => void;
  onFinish?: (finishComment: OnFinishCommentType, handleComment?: () => void) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onComment,
  onFinish
}) => {

  const [showEditor, setShowEditor] = useState(false);

  const toggle = () => {
    setShowEditor(prev => !prev);
  };

  const { user } = comment; 

  const handleComment = () => {
    setShowEditor(false);
    onComment && onComment();
  };

  const handleFinish = (value: string) => {
    if (onFinish) {
      onFinish({
        comment: value,
        to_user_id: user.id,
        be_comment_id: comment.id
      }, handleComment);
    }
  };

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
            {
              comment.be_comment_id && comment.toUser ? (
                <span className={styles['comment-reply']}>
                  回复
                  <span className={styles['comment-reply-username']}>
                    {comment.toUser.name}
                  </span>
                </span>
              ) : (
                <span className={styles['comment-author-info']}>{user.job_title}  @{user.company}</span>
              )
            }
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
          { showEditor && (<CommentEditor onFinish={handleFinish} withAvatar={false} /> )}
          {
            !!comment.children?.length && comment.children?.length > 0 && (
              <div className={styles['comment-children-area']}>
                {
                  comment.children && comment.children.map(item => (
                    <CommentItem onComment={handleComment} onFinish={onFinish} comment={item} key={item.id}/>
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