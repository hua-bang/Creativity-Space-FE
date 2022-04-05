export enum DraftTypeEnum {
  ARTICLE = 1,
  BOOKLET = 2,
}

export interface Draft {
  id: string;
  create_time: string;
  update_time: string;
  content: string;
  title: string;
  status: number;
  user_id: string;
  type: DraftTypeEnum;
}

export type UpsertDraftType = Pick<Draft, 'content' | 'title' | 'type'> & {
  id?: string;
};