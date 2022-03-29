export enum TagStatusEnum {
  DELETED = -2,
  FORBIDDEN = -1,
  UNAUDITED = 0,
  AUDITED = 1,
}

export interface Tag {
  id: string;
  name: string;
  status: TagStatusEnum; 
}