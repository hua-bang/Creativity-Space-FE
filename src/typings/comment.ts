import { Point } from '@/typings/point';
import { User } from '@/typings/user';
import { RequiredKey } from './utils';

export enum CommentStatusEnum {
  DELETE = -2,
  FORBIDDEN = -1,
  NORMAL = 1
}

export interface Comment {
  id: string;
  comment: string;
  user: User;
  user_id: string;
  point: Point;
  toUser: User;
  to_user_id: string;
  be_comment_id: string;
  publish_time: string;
  status: CommentStatusEnum;
  children?: Comment[];
}

export interface PointComment extends Comment {
  point_id: string;
}

export type CreateCommentType = RequiredKey<
  PointComment, 
  'comment' | 'point_id'
>

export interface ArticleComment extends Comment {
  article_id: string;
}

export type CreateArticleComment = RequiredKey<
  ArticleComment,
  'comment' | 'article_id'
>;