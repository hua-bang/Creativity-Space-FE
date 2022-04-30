import { Booklet } from './booklet';

export enum BookletArticleStatusEnum {
  DELETED = -2,
  FORBIDDEN = -1,
  DRAFT = 0,
  UNAUDITED = 1,
  AUDITED = 2,
}
export interface BookletArticle {
  id: string;
  title: string;
  status: BookletArticleStatusEnum;
  description: string;
  content: string;
  create_time: string;
  update_time: string;
  order: number;
  booklet: Booklet;
  booklet_id: string;
}

export type UpdateBookletArticleType = Pick<
  BookletArticle, 
  'title' | 'content' | 'status' | 'description' | 'booklet_id'
>

export type CreateBookletArticleType = Pick<
  BookletArticle,
  'title' | 'content' | 'status' | 'description' | 'booklet_id'
>;