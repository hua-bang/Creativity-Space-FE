export enum CategoryStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 1,
}

export interface Category {
  id: string;
  name: string;
  status: CategoryStatusEnum;
}

export enum TagStatusEnum {
  FORBIDDEN = -1,
  NORMAL = 0,
}

export interface Tag {
  id: string;
  name: string;
  status: TagStatusEnum;
}