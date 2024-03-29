import { Comment } from '@/typings/comment';

/**
 * @param comments
 * 将comments转成树结构
 * TODO: 该方案需要优化
 */
export const transformCommentToTree = <T extends Comment[]>(comments: T): T => {
  const newComments = comments.filter(comment => !comment.be_comment_id).map(item => {
    item.children = [];
    return item;
  });

  newComments.forEach(comment => {
    const commentId = comment.id;
    const childrenCommentIdArr = comment.children?.map(item => item.id);
    comments.forEach(item => {
      if (item.be_comment_id === commentId || childrenCommentIdArr?.includes(item.be_comment_id)) {
        comment.children?.push(item);
        childrenCommentIdArr?.push(item.id);
      }
    });
  });
  return newComments as T;
};