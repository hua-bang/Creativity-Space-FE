import request from '@/request';

export const followUser = (id: string) => {
  return request.post(`user-follow/follow/${id}`, { 
    autoRedirect: true
  });
};

export function getUserFollowByFollowUserId(follow_user_id: string) {
  return request.get(`user-follow/user/follow/${follow_user_id}`, { 
    autoRedirect: true
  });
}