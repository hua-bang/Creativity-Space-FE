import React, { useEffect, useState } from 'react';
import PointModal from '@/components/Point-Modal';
import { Empty, Message } from '@arco-design/web-react';
import styles from './index.module.scss';
import { getPointById, getCommentByPointId } from '@/api/point';
import { Point } from '@/typings/point';
import { useParams } from 'react-router-dom';
import CommentEditor from '@/components/Comment-Editor';
import CommentItem from '@/components/Comment-Item';
import { Comment } from '@/typings/comment';
import { transformCommentToTree } from '@/utils/comment';
import { createComment } from '@/api/point';

const Main: React.FC = () => {

  const params = useParams();
  const pointId = params.id;

  const [point, setPoint] = useState<Point>();
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentChange = (val: string) => {
    setCommentValue(val);
  };

  const handleSubmit = () => {
    if (pointId) {
      createComment({
        comment: commentValue,
        point_id: pointId
      }).then(res => {
        Message.success('新增成功');
        loadComments(pointId);
      }).catch(err => {
        Message.warning(err.message);
      });
    }  
  };

  const handleComment = () => {
    if(pointId) {
      loadComments(pointId);
    }
  };

  const loadPointData = (pointId: string) => {
    getPointById(pointId).then(res => {
      setPoint(res.data);
    });
  };

  const loadComments = (pointId: string) => {
    getCommentByPointId(pointId).then(res => {
      setComments(transformCommentToTree(res.data));
    });
  };

  useEffect(() => {
    if (pointId) {
      loadPointData(pointId);
      loadComments(pointId);
    }
  }, [pointId]);


  return (
    <div className={styles['main-page']}>
      <div className={styles['main-page-point']}>
        { point ? <PointModal point={point} /> : <Empty/> }
      </div>
      <div className={styles['main-comment-area']}>
        <div className={styles['main-comment-title']}>
          评论
        </div>
        <div className={styles['main-comment-textarea']}>
          <CommentEditor value={commentValue} onChange={handleCommentChange} onFinish={handleSubmit} />
        </div>
        <div className={styles['main-comment-title']}>
          全部评论
        </div>
        <div className={styles['main-comment-comment-list']}>
          {
            comments.length > 0 
              ? comments.map(comment => (
                <CommentItem onComment={handleComment} key={comment.id} comment={comment} />
              ))
              : <Empty />
          }
        </div>
      </div>
    </div>
  );
};

export default Main;
