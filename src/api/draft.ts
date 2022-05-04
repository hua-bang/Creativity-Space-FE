import { UpsertDraftType, QueryDraft } from './../typings/draft';
import request from '../request';

export const upsertDraft = (data: UpsertDraftType) => {
  return request.post('/draft/upsert', data);
};

export const getDraftById = (id: string) => {
  return request.get(`/draft/info/${id}`);
};

export const queryDraftList = (query: QueryDraft) => {
  return request.post('/draft/queryByUser', query);
};
