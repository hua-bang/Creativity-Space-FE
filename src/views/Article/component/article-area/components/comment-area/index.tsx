import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import CommentEditor from '@/components/Comment-Editor';
import { createComment, deleteComment, getCommentByArticleId } from '@/api/article';
import { Article } from '@/typings/article';
import { Message } from '@arco-design/web-react';
import { ArticleComment } from '@/typings/comment';
import { transformCommentToTree } from '@/utils/comment';
import CommentItem, { OnFinishCommentType } from '@/components/Comment-Item';

interface CommentAreaProps {
  article: Article;
}

const CommentArea: React.FC<CommentAreaProps> = ({
  article
}) => {

  const [value, setValue] = useState<string>('');
  const [comments, setComments] = useState<ArticleComment[]>([]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleFinish = (value: string) => {
    createComment({
      comment: value,
      article_id: article.id,
      to_user_id: article.user?.id
    }).then(res => {
      Message.success('评论成功。');
      setValue('');
      loadComments();
    }).catch(err => {
      Message.warning('评论失败，请重试。');
    });
  };

  const loadComments = () => {
    getCommentByArticleId(article.id).then(res => {
      setComments(transformCommentToTree(res.data));
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  const handleCommentFinish = (onFinishComment: OnFinishCommentType, fn?: () => void) => {
    createComment({
      ...onFinishComment,
      article_id: article.id
    }).then(res => {
      Message.success('回复成功。');
      fn && fn();
      loadComments();
    }).catch(_ => {
      Message.warning('回复失败。');
    });
  };

  const handleDelComment = (commentId: string) => {
    deleteComment(commentId).then(res => {
      Message.success('删除成功.');
      loadComments();
    }).catch(err => {
      Message.warning(err.message);
    });
  };

  useEffect(() => {
    loadComments();
  },[article]);

  return (
    <div className={styles['comment-area']}>
      <div className={styles['comment-area-title']}>
        评论区
      </div>
      <div className={styles['comment-area-editor-wrapper']}>
        <CommentEditor value={value} onChange={handleChange} onFinish={handleFinish} />
      </div>
      <div className={styles['comment-area-main']}>
        {
          comments.map(comment => (
            <CommentItem 
              onDelComment={handleDelComment} 
              onFinish={handleCommentFinish} 
              key={comment.id} 
              comment={comment} 
            />
          ))
        }
      </div>
    </div>
  );
};

export default CommentArea;