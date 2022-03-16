import { User } from './user';
import { RequiredKey } from './utils';

export enum PointStatusEnum {
  DELETED = -2,
  FORBIDDEN = -1,
  UNAUDITED = 0,
  AUDITED = 1,
}

export interface Point {
  id: string;
  create_time: number;
  comment_count: number;
  content: string;
  like_count: number;
  user: User;
  tags_id?: string; 
}

export type CreatePointType = RequiredKey<
  Point, 
  'content'
>;