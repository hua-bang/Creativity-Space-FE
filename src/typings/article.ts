import { User } from './user';
import { RequiredKey } from './utils';
import { Tag } from './tag';

export enum ArticleStatusEnum {
  DELETED = -2,
  FORBIDDEN = -1,
  UNAUDITED = 0,
  AUDITED = 1,
}

export enum ArticleTypeEnum {
  NORMAL = 1,
  BOOKLET = 2,
}

export interface Article {
  id: string;
  title: string;
  status: ArticleStatusEnum;
  description: string;
  create_time: number;
  category_id: string;
  update_time: number;
  type: ArticleTypeEnum;
  collect_count: number;
  comment_count: number;
  content: string;
  like_count: number;
  cover_url: string;
  user?: User;
  tags: Tag[];
}

export type CreateArticleType = RequiredKey<
  Article, 
  'title' | 'description' | 'category_id' | 'type' | 'content' | 'cover_url'
>;


export type UpdateArticleType = RequiredKey<
  Article, 
  'id' | 'title' | 'description' | 'category_id' | 'type' | 'content' | 'cover_url'
>;

export interface QueryArticleDto {
  page: number;
  pageSize: number;
  status?: ArticleStatusEnum;
  title?: string;
  order?: string;
  order_by?: string;
}