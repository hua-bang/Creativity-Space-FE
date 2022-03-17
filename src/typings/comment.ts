import { Point } from '@/typings/point';
import { User } from '@/typings/user';

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
  point_id: string;
  point: Point;
  to_user: User;
  be_comment_id: string;
  publish_time: string;
  status: CommentStatusEnum;
  children?: Comment[];
}