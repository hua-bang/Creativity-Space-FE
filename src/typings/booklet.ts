import { BookletArticle } from '@/typings/booklet-article';
import { User } from "./user";

export enum BookletStatusEnum {
  FORBIDDEN = -1,
  REJECTED = -2,
  NO_AUDIT = 0,
  NORMAL = 1,
}

export interface Booklet {
  id: string;

  name: string;

  create_time: string;

  update_time: string;

  description: string;

  introduce: string;

  status: BookletStatusEnum;

  cover_url: string;

  user: User;

  articles: BookletArticle[];
}

export type CreateBookletType = Pick<
  Booklet,
  'cover_url' | 'name' | 'description' | 'introduce'
>;

export type UpdateBookletType = Pick<
  Booklet,
  'id' | 'cover_url' | 'name' | 'description' | 'introduce'
>; 


export interface QueryBookletDto {
  page: number;
  pageSize: number;
  status?: BookletStatusEnum;
  name?: string;
  description?: string;
  order?: string;
  order_by?: string;
}
