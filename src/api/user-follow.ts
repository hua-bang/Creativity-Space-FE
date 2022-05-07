import request from '@/request';

export const followUser = (id: string) => {
  return request.post(`user-follow/follow/${id}`, { 
    autoRedirect: true
  });
};

export function getUserFollowByFollowUserId(follow_user_id: string) {
  return request.get(`user-follow/user/follow/${follow_user_id}`, { 
    autoRedirect: false
  });
}

export function getFollowers(userId: string) {
  return request.get(`user-follow/user/followers/${userId}`);
}

export function getBeFollowers(userId: string) {
  return request.get(`user-follow/user/be_followers/${userId}`);
}